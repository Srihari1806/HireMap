import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cron from 'node-cron';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

import { connectDatabase } from './utils/database.js';
import { logger } from './utils/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import type { ErrorRequestHandler } from 'express';

// Routes
import authRoutes from './routes/auth.js';
import jobRoutes from './routes/jobs.js';
import resumeRoutes from './routes/resume.js';
import roadmapRoutes from './routes/roadmap.js';
import adminRoutes from './routes/admin.js';

// Services
import { JobScraperService } from './services/jobScraper.js';

const app = express();
const PORT = process.env.PORT || 5000;
const scraper = new JobScraperService();

// ── Ensure directories exist ──────────────────────────────────
const uploadDir = process.env.UPLOAD_DIR || './uploads';
const logDir = './logs';
[uploadDir, logDir].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ── Security Middleware ───────────────────────────────────────
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

app.use(
  cors({
    origin: process.env.FRONTEND_URL
      ? process.env.FRONTEND_URL.split(',')
      : ['http://localhost:5173', 'http://localhost:3000', 'https://srihari1806.github.io'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ── Rate Limiting ─────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Too many requests on this endpoint.' },
});

app.use(globalLimiter);

// ── Body Parsing ──────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Static file serving (uploads) ────────────────────────────
app.use('/uploads', express.static(path.resolve(uploadDir)));

// ── Health Check ──────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'HireMap API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (_req, res) => {
  res.json({
    message: '🚀 HireMap Career Intelligence API',
    version: '1.0.0',
    docs: '/api-docs',
    health: '/health',
    endpoints: {
      auth: '/api/auth',
      jobs: '/api/jobs',
      resume: '/api/resume',
      roadmap: '/api/roadmap',
      admin: '/api/admin',
    },
  });
});

// ── API Docs (simple JSON) ────────────────────────────────────
app.get('/api-docs', (_req, res) => {
  res.json({
    title: 'HireMap API Documentation',
    version: '1.0.0',
    baseUrl: `http://localhost:${PORT}`,
    authentication: 'Bearer JWT token in Authorization header',
    endpoints: {
      auth: {
        'POST /api/auth/register': 'Register user (pass firebaseUid + email + name)',
        'POST /api/auth/login': 'Login with firebaseUid, get JWT',
        'GET /api/auth/me': 'Get current user profile [auth]',
        'PATCH /api/auth/profile': 'Update user profile [auth]',
      },
      jobs: {
        'GET /api/jobs': 'List jobs (query: type, domain, location, remote, search, sortBy, page, limit)',
        'GET /api/jobs/:id': 'Get job details',
        'GET /api/jobs/stats/overview': 'Job statistics',
        'POST /api/jobs/:id/save': 'Save a job [auth]',
        'PATCH /api/jobs/:id/status': 'Update application status [auth]',
        'GET /api/jobs/user/applications': 'Get all user applications [auth]',
      },
      resume: {
        'POST /api/resume/upload': 'Upload resume PDF/DOCX [auth, multipart]',
        'POST /api/resume/ats-check': 'Run ATS analysis [auth]',
        'GET /api/resume/ats-history': 'Get ATS check history [auth]',
        'GET /api/resume/list': 'List uploaded resumes [auth]',
        'POST /api/resume/enhance-section': 'AI-enhance resume section [auth]',
        'POST /api/resume/cover-letter': 'Generate cover letter [auth]',
      },
      roadmap: {
        'POST /api/roadmap/generate': 'Generate AI roadmap [auth]',
        'GET /api/roadmap': 'List user roadmaps [auth]',
        'GET /api/roadmap/:id': 'Get roadmap details [auth]',
        'PATCH /api/roadmap/:id/week/:weekId/task': 'Mark task done [auth]',
        'POST /api/roadmap/skill-gap': 'Analyze skill gap [auth]',
        'DELETE /api/roadmap/:id': 'Delete roadmap [auth]',
      },
      admin: {
        'POST /api/admin/scrape': 'Trigger job scraping [admin]',
        'POST /api/admin/jobs': 'Manually add job [admin]',
        'PATCH /api/admin/jobs/:id/verify': 'Verify job listing [admin]',
        'DELETE /api/admin/jobs/:id': 'Deactivate job [admin]',
        'GET /api/admin/stats': 'Platform statistics [admin]',
        'GET /api/admin/users': 'List users [admin]',
      },
    },
  });
});

// ── Routes ────────────────────────────────────────────────────
app.use('/api/auth', strictLimiter, authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/admin', adminRoutes);

// ── 404 Handler ───────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Global Error Handler ──────────────────────────────────────
app.use(errorHandler as ErrorRequestHandler);

// ── Scheduled Jobs ────────────────────────────────────────────
function setupCronJobs(): void {
  const intervalHours = parseInt(process.env.SCRAPING_INTERVAL_HOURS || '6');
  const cronExpression = `0 */${intervalHours} * * *`;

  cron.schedule(cronExpression, async () => {
    logger.info(`Running scheduled job scrape (every ${intervalHours}h)`);
    await scraper.runFullScrape();
  });

  logger.info(`⏰ Scheduled scraping every ${intervalHours} hours`);
}

// ── Bootstrap ─────────────────────────────────────────────────
async function bootstrap(): Promise<void> {
  try {
    await connectDatabase();

    // Setup cron only in production or when explicitly enabled
    if (process.env.NODE_ENV === 'production' || process.env.ENABLE_CRON === 'true') {
      setupCronJobs();
    }

    app.listen(PORT, () => {
      logger.info(`
╔════════════════════════════════════════╗
║   🚀 HireMap API Server Running        ║
║   Port:    ${PORT}                        ║
║   Mode:    ${(process.env.NODE_ENV || 'development').padEnd(12)}           ║
║   Health:  http://localhost:${PORT}/health ║
║   Docs:    http://localhost:${PORT}/api-docs ║
╚════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// ── Graceful Shutdown ─────────────────────────────────────────
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received — shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received — shutting down gracefully');
  process.exit(0);
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled rejection:', reason);
});

bootstrap();

export default app;
