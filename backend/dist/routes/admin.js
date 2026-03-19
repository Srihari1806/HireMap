import { Router } from 'express';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';
import { prisma } from '../utils/database.js';
const router = Router();
// All admin routes require auth + admin role
router.use(authenticate);
router.use(requireAdmin);
// GET /api/admin/stats
router.get('/stats', async (_req, res, next) => {
    try {
        const [totalUsers, totalJobs, totalApplications] = await Promise.all([
            prisma.user.count(),
            prisma.job.count(),
            prisma.application.count(),
        ]);
        res.json({ totalUsers, totalJobs, totalApplications });
    }
    catch (err) {
        next(err);
    }
});
// GET /api/admin/users
router.get('/users', async (_req, res, next) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true, email: true, name: true, role: true,
                college: true, branch: true, createdAt: true,
            },
        });
        res.json(users);
    }
    catch (err) {
        next(err);
    }
});
// POST /api/admin/jobs  — manually add a job
router.post('/jobs', async (req, res, next) => {
    try {
        const data = req.body;
        if (!data['title'] || !data['company'])
            throw new AppError('title and company are required', 400);
        const job = await prisma.job.create({
            data: {
                ...data,
                source: 'ADMIN',
                verified: true,
                postedAt: new Date(),
            },
        });
        res.status(201).json(job);
    }
    catch (err) {
        next(err);
    }
});
// PATCH /api/admin/jobs/:id/verify
router.patch('/jobs/:id/verify', async (req, res, next) => {
    try {
        const job = await prisma.job.update({
            where: { id: req.params['id'] },
            data: { verified: true },
        });
        res.json(job);
    }
    catch (err) {
        next(err);
    }
});
// DELETE /api/admin/jobs/:id
router.delete('/jobs/:id', async (req, res, next) => {
    try {
        await prisma.job.update({
            where: { id: req.params['id'] },
            data: { active: false },
        });
        res.json({ message: 'Job deactivated' });
    }
    catch (err) {
        next(err);
    }
});
// Placeholder removed
export default router;
//# sourceMappingURL=admin.js.map