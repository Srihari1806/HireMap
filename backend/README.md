# HireMap Backend API

> AI-powered career intelligence platform backend — Job aggregation, ATS resume analysis, skill gap detection, and personalized roadmap generation.

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 20 + TypeScript |
| Framework | Express.js v5 |
| Database | PostgreSQL 16 + Prisma ORM |
| Cache | Redis |
| AI | Claude (Anthropic) / fallback to static |
| Auth | Firebase Auth + JWT |
| Scraping | Cheerio + Axios |
| Scheduling | node-cron |
| Validation | Zod |
| Logging | Winston |

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── index.ts              # Express app entry point + bootstrap
│   ├── types/index.ts        # Shared TypeScript types
│   ├── utils/
│   │   ├── database.ts       # Prisma client singleton
│   │   ├── logger.ts         # Winston logger
│   │   └── seed.ts           # Database seeder
│   ├── middleware/
│   │   ├── auth.ts           # JWT authentication middleware
│   │   └── errorHandler.ts   # Global error handler + AppError
│   ├── routes/
│   │   ├── auth.ts           # POST /register, /login, PATCH /profile
│   │   ├── jobs.ts           # GET/POST /jobs + applications
│   │   ├── resume.ts         # Upload, ATS check, cover letter
│   │   ├── roadmap.ts        # AI roadmap generation + task tracking
│   │   └── admin.ts          # Admin-only endpoints
│   └── services/
│       ├── resumeParser.ts   # PDF/DOCX text extraction + parsing
│       ├── atsAnalyzer.ts    # ATS scoring algorithm (no AI needed)
│       ├── aiService.ts      # Claude AI integration (roadmaps, cover letters)
│       └── jobScraper.ts     # Internshala, RemoteOK, Arbeitnow scrapers
├── prisma/
│   └── schema.prisma         # Database models
├── docker-compose.yml        # Local dev: Postgres + Redis + API
├── Dockerfile                # Production container
└── .env.example              # Environment variables template
```

---

## ⚡ Quick Start (Local Dev)

### Option A: Docker (Recommended — 3 commands)

```bash
cd backend

# 1. Copy environment config
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY (optional)

# 2. Start everything
docker-compose up -d

# 3. Run migrations + seed
docker exec hiremap-api npx prisma migrate dev --name init
docker exec hiremap-api npm run seed
```

API live at: `http://localhost:5000`

---

### Option B: Manual Setup

#### Prerequisites
- Node.js 20+
- PostgreSQL 16 (local or [Supabase](https://supabase.com) free tier)
- Redis (optional — for caching)

```bash
# 1. Install dependencies
cd backend
npm install

# 2. Configure environment
cp .env.example .env
# Edit DATABASE_URL, JWT_SECRET, ANTHROPIC_API_KEY

# 3. Run database migrations
npx prisma migrate dev --name init

# 4. Generate Prisma client
npx prisma generate

# 5. Seed sample jobs
npm run seed

# 6. Start dev server (hot-reload)
npm run dev
```

---

## 🔑 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `JWT_SECRET` | ✅ | Min 32 char secret for JWT signing |
| `ANTHROPIC_API_KEY` | ⚡ | Claude API key for AI features |
| `REDIS_URL` | ❌ | Redis URL (optional caching) |
| `PORT` | ❌ | Server port (default: 5000) |
| `FRONTEND_URL` | ❌ | CORS allowed origin |
| `UPLOAD_DIR` | ❌ | Resume upload directory |
| `SCRAPING_INTERVAL_HOURS` | ❌ | Auto-scrape interval (default: 6) |

> **Without `ANTHROPIC_API_KEY`**: The API works fully — roadmaps and cover letters fall back to high-quality static templates. ATS analysis never requires AI.

---

## 📡 API Reference

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register with Firebase UID |
| POST | `/api/auth/login` | Exchange Firebase UID → JWT |
| GET | `/api/auth/me` | Get current user 🔒 |
| PATCH | `/api/auth/profile` | Update profile 🔒 |

### Jobs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | List jobs with filters |
| GET | `/api/jobs/:id` | Job details + match score 🔒 |
| GET | `/api/jobs/stats/overview` | Platform statistics |
| POST | `/api/jobs/:id/save` | Save job 🔒 |
| PATCH | `/api/jobs/:id/status` | Update application status 🔒 |
| GET | `/api/jobs/user/applications` | User's applications 🔒 |

**Job query params**: `type`, `domain`, `location`, `remote`, `search`, `source`, `sortBy` (latest/salary/match), `page`, `limit`

### Resume
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/resume/upload` | Upload PDF/DOCX 🔒 |
| POST | `/api/resume/ats-check` | Run ATS analysis 🔒 |
| GET | `/api/resume/ats-history` | Past ATS checks 🔒 |
| GET | `/api/resume/list` | Uploaded resumes 🔒 |
| POST | `/api/resume/enhance-section` | AI section improver 🔒 |
| POST | `/api/resume/cover-letter` | Generate cover letter 🔒 |

### Roadmap
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/roadmap/generate` | Generate AI roadmap 🔒 |
| GET | `/api/roadmap` | List user roadmaps 🔒 |
| GET | `/api/roadmap/:id` | Roadmap detail 🔒 |
| PATCH | `/api/roadmap/:id/week/:weekId/task` | Mark task done 🔒 |
| POST | `/api/roadmap/skill-gap` | Quick skill gap analysis 🔒 |
| DELETE | `/api/roadmap/:id` | Delete roadmap 🔒 |

🔒 = Requires `Authorization: Bearer <token>` header

---

## 🔗 Frontend Integration

Add to your frontend's `.env`:
```env
VITE_API_URL=http://localhost:5000
```

Use the included `src/api-client.ts` which exports:
- `authAPI` — register, login, profile sync
- `jobsAPI` — list, get, save, application tracking
- `resumeAPI` — upload, ATS check, cover letter
- `roadmapAPI` — generate, list, task tracking

The API client automatically:
- Injects JWT from localStorage
- Handles multipart file uploads
- Types all request/response payloads

---

## 🤖 How Features Work

### ATS Resume Analyzer
1. Resume uploaded → extracted text via `pdf-parse`
2. `ResumeParserService` extracts skills, experience, education, projects
3. `ATSAnalyzerService` scores against role-specific keyword libraries
4. No AI needed — pure algorithmic scoring with weighted sections

### AI Roadmap Generator
1. User inputs target role + duration
2. Skill gap calculated against role requirements
3. Claude generates week-by-week plan (falls back to curated static plans)
4. Saved to PostgreSQL with per-task completion tracking

### Job Aggregation
- **Scheduled**: Auto-scrapes every 6 hours (configurable)
- **Sources**: Internshala, RemoteOK, Arbeitnow + manual admin entries
- **Dedup**: External job ID prevents duplicate imports
- **Match**: Skills compared against user profile on authenticated requests

---

## 🚀 Production Deployment

### Railway / Render
```bash
# Set these env vars in dashboard
DATABASE_URL=postgresql://...
JWT_SECRET=...
ANTHROPIC_API_KEY=sk-ant-...
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
ENABLE_CRON=true
```

### Supabase (Free PostgreSQL)
1. Create project at supabase.com
2. Copy connection string from Settings → Database
3. Set `DATABASE_URL` in environment

---

## 🧪 Testing the API

```bash
# Health check
curl http://localhost:5000/health

# Register (call after Firebase auth)
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firebaseUid":"abc123","email":"test@test.com","name":"Test User"}'

# List jobs
curl "http://localhost:5000/api/jobs?type=INTERNSHIP&limit=5"

# ATS check (with auth token)
curl -X POST http://localhost:5000/api/resume/ats-check \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"targetRole":"Backend Engineer"}'
```
