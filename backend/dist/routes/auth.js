import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../utils/database.js';
import { authenticate } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';
const router = Router();
// POST /api/auth/register
router.post('/register', async (req, res, next) => {
    try {
        const { firebaseUid, email, name } = req.body;
        if (!firebaseUid || !email || !name) {
            throw new AppError('firebaseUid, email, and name are required', 400);
        }
        let user = await prisma.user.findUnique({ where: { firebaseUid } });
        const isNew = !user;
        if (!user) {
            user = await prisma.user.create({
                data: { firebaseUid, email, name },
            });
        }
        const secret = process.env.JWT_SECRET;
        if (!secret)
            throw new AppError('Server misconfiguration', 500);
        const token = jwt.sign({ userId: user.id }, secret, {
            expiresIn: '7d',
        });
        res.status(isNew ? 201 : 200).json({ token, user, isNew });
    }
    catch (err) {
        next(err);
    }
});
// POST /api/auth/login
router.post('/login', async (req, res, next) => {
    try {
        const { firebaseUid } = req.body;
        if (!firebaseUid)
            throw new AppError('firebaseUid is required', 400);
        const user = await prisma.user.findUnique({ where: { firebaseUid } });
        if (!user)
            throw new AppError('User not found — please register first', 404);
        const secret = process.env.JWT_SECRET;
        if (!secret)
            throw new AppError('Server misconfiguration', 500);
        const token = jwt.sign({ userId: user.id }, secret, {
            expiresIn: '7d',
        });
        res.json({ token, user });
    }
    catch (err) {
        next(err);
    }
});
// GET /api/auth/me
router.get('/me', authenticate, async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.user.id } });
        if (!user)
            throw new AppError('User not found', 404);
        res.json(user);
    }
    catch (err) {
        next(err);
    }
});
// PATCH /api/auth/profile
router.patch('/profile', authenticate, async (req, res, next) => {
    try {
        const { college, branch, cgpa, graduationYear, location, bio, github, leetcode, skills, targetRoles, preferredLocs, jobFocus, weeklyHours, } = req.body;
        const user = await prisma.user.update({
            where: { id: req.user.id },
            data: {
                college: college,
                branch: branch,
                cgpa: cgpa,
                graduationYear: graduationYear,
                location: location,
                bio: bio,
                github: github,
                leetcode: leetcode,
                skills: skills,
                targetRoles: targetRoles,
                preferredLocs: preferredLocs,
                jobFocus: jobFocus,
                weeklyHours: weeklyHours,
            },
        });
        res.json(user);
    }
    catch (err) {
        next(err);
    }
});
export default router;
//# sourceMappingURL=auth.js.map