import { Router } from 'express';
import type { Request, Response } from 'express';
import { authenticate, requireAdmin, type AuthRequest } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';
import { prisma } from '../utils/database.js';

const router = Router();

// All admin routes require auth + admin role
router.use(authenticate as (req: Request, res: Response, next: () => void) => void);
router.use(requireAdmin as (req: Request, res: Response, next: () => void) => void);

// GET /api/admin/stats
router.get('/stats', async (_req: AuthRequest, res: Response, next) => {
  try {
    const [totalUsers, totalJobs, totalApplications] = await Promise.all([
      prisma.user.count(),
      prisma.job.count(),
      prisma.application.count(),
    ]);
    res.json({ totalUsers, totalJobs, totalApplications });
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/users
router.get('/users', async (_req: AuthRequest, res: Response, next) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, email: true, name: true, role: true,
        college: true, branch: true, createdAt: true,
      },
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/jobs  — manually add a job
router.post('/jobs', async (req: AuthRequest, res: Response, next) => {
  try {
    const data = req.body as Record<string, unknown>;
    if (!data['title'] || !data['company']) throw new AppError('title and company are required', 400);

    const job = await prisma.job.create({
      data: {
        ...(data as any),
        source: 'ADMIN',
        verified: true,
        postedAt: new Date(),
      },
    });
    res.status(201).json(job);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/admin/jobs/:id/verify
router.patch('/jobs/:id/verify', async (req: AuthRequest, res: Response, next) => {
  try {
    const job = await prisma.job.update({
      where: { id: req.params['id'] as string },
      data: { verified: true },
    });
    res.json(job);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/jobs/:id
router.delete('/jobs/:id', async (req: AuthRequest, res: Response, next) => {
  try {
    await prisma.job.update({
      where: { id: req.params['id'] as string },
      data: { active: false },
    });
    res.json({ message: 'Job deactivated' });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/scrape  — trigger job scraping
router.post('/scrape', async (_req: AuthRequest, res: Response, next) => {
  try {
    // Placeholder: in real impl, would call JobScraperService
    res.json({ message: 'Job scraping triggered', status: 'running' });
  } catch (err) {
    next(err);
  }
});

export default router;
