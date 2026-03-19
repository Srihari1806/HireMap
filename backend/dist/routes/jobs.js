import { Router } from 'express';
import { prisma } from '../utils/database.js';
import { authenticate } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';
const router = Router();
// GET /api/jobs
router.get('/', async (req, res, next) => {
    try {
        const { page = '1', limit = '20', type, domain, location, remote, search, source, sortBy, } = req.query;
        const pageNum = Math.max(1, parseInt(page ?? '1'));
        const limitNum = Math.min(50, parseInt(limit ?? '20'));
        const skip = (pageNum - 1) * limitNum;
        const where = { active: true };
        if (type)
            where['type'] = type;
        if (domain)
            where['domain'] = { has: domain };
        if (location)
            where['location'] = { contains: location, mode: 'insensitive' };
        if (remote === 'true')
            where['remote'] = true;
        if (source)
            where['source'] = source;
        if (search) {
            where['OR'] = [
                { title: { contains: search, mode: 'insensitive' } },
                { company: { contains: search, mode: 'insensitive' } },
            ];
        }
        const orderBy = sortBy === 'salary' ? { salaryMax: 'desc' } : { postedAt: 'desc' };
        const [jobs, total] = await Promise.all([
            prisma.job.findMany({ where, skip, take: limitNum, orderBy }),
            prisma.job.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limitNum);
        res.json({
            jobs,
            pagination: {
                page: pageNum, limit: limitNum, total,
                totalPages, hasNext: pageNum < totalPages, hasPrev: pageNum > 1,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
// GET /api/jobs/stats/overview
router.get('/stats/overview', async (_req, res, next) => {
    try {
        const [totalJobs, internships, remoteJobs, fullTimeJobs] = await Promise.all([
            prisma.job.count({ where: { active: true } }),
            prisma.job.count({ where: { active: true, type: 'INTERNSHIP' } }),
            prisma.job.count({ where: { active: true, remote: true } }),
            prisma.job.count({ where: { active: true, type: 'FULL_TIME' } }),
        ]);
        res.json({ totalJobs, internships, remoteJobs, fullTimeJobs });
    }
    catch (err) {
        next(err);
    }
});
// GET /api/jobs/user/applications
router.get('/user/applications', authenticate, async (req, res, next) => {
    try {
        const applications = await prisma.application.findMany({
            where: { userId: req.user.id },
            include: {
                job: {
                    select: {
                        id: true, title: true, company: true, type: true,
                        location: true, remote: true, stipend: true, ctc: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        res.json(applications);
    }
    catch (err) {
        next(err);
    }
});
// GET /api/jobs/:id
router.get('/:id', async (req, res, next) => {
    try {
        const job = await prisma.job.findUnique({ where: { id: req.params['id'] } });
        if (!job)
            throw new AppError('Job not found', 404);
        res.json(job);
    }
    catch (err) {
        next(err);
    }
});
// POST /api/jobs/:id/save
router.post('/:id/save', authenticate, async (req, res, next) => {
    try {
        const jobId = req.params['id'];
        const userId = req.user.id;
        const existing = await prisma.application.findFirst({ where: { userId, jobId } });
        if (existing) {
            res.json({ message: 'Already saved', application: existing });
            return;
        }
        const application = await prisma.application.create({
            data: { userId, jobId, status: 'SAVED' },
        });
        res.status(201).json({ message: 'Job saved', application });
    }
    catch (err) {
        next(err);
    }
});
// PATCH /api/jobs/:id/status
router.patch('/:id/status', authenticate, async (req, res, next) => {
    try {
        const { status, notes } = req.body;
        const jobId = req.params['id'];
        const userId = req.user.id;
        const app = await prisma.application.upsert({
            where: { userId_jobId: { userId, jobId } },
            update: { status, notes },
            create: { userId, jobId, status, notes },
        });
        res.json(app);
    }
    catch (err) {
        next(err);
    }
});
export default router;
//# sourceMappingURL=jobs.js.map