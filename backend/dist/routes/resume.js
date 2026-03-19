import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { authenticate } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';
import { prisma } from '../utils/database.js';
const router = Router();
const storage = multer.diskStorage({
    destination: process.env.UPLOAD_DIR || './uploads',
    filename: (_req, file, cb) => {
        const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${unique}${path.extname(file.originalname)}`);
    },
});
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    fileFilter: (_req, file, cb) => {
        const allowed = ['.pdf', '.doc', '.docx'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowed.includes(ext)) {
            cb(null, true);
        }
        else {
            cb(new Error('Only PDF and DOCX files are allowed'));
        }
    },
});
// POST /api/resume/upload
router.post('/upload', authenticate, upload.single('resume'), async (req, res, next) => {
    try {
        if (!req.file)
            throw new AppError('No file uploaded', 400);
        const resume = await prisma.resume.create({
            data: {
                userId: req.user.id,
                fileName: req.file.originalname,
                filePath: req.file.path,
            },
        });
        res.status(201).json({
            resume: { id: resume.id, fileName: resume.fileName, createdAt: resume.createdAt },
            parsed: { skills: [], education: [], experienceCount: 0, projectCount: 0 },
            message: 'Resume uploaded successfully',
        });
    }
    catch (err) {
        next(err);
    }
});
// POST /api/resume/ats-check
router.post('/ats-check', authenticate, async (req, res, next) => {
    try {
        const { targetRole } = req.body;
        // Basic ATS score placeholder (real impl would parse resume + score)
        const score = Math.floor(Math.random() * 30) + 60;
        const result = await prisma.aTSCheck.create({
            data: {
                userId: req.user.id,
                targetRole: targetRole ?? 'General',
                overallScore: score,
                keywordScore: score,
                formattingScore: score,
                experienceScore: score,
                educationScore: score,
                skillsScore: score,
                matchedKeywords: [],
                missingKeywords: [],
                strengths: ['Good formatting'],
                improvements: ['Add more relevant keywords'],
                suggestions: [],
            },
        });
        res.json(result);
    }
    catch (err) {
        next(err);
    }
});
// GET /api/resume/ats-history
router.get('/ats-history', authenticate, async (req, res, next) => {
    try {
        const history = await prisma.aTSCheck.findMany({
            where: { userId: req.user.id },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true, overallScore: true, targetRole: true,
                createdAt: true, keywordScore: true,
                formattingScore: true, experienceScore: true,
            },
        });
        res.json(history);
    }
    catch (err) {
        next(err);
    }
});
// GET /api/resume/list
router.get('/list', authenticate, async (req, res, next) => {
    try {
        const resumes = await prisma.resume.findMany({
            where: { userId: req.user.id },
            orderBy: { createdAt: 'desc' },
            select: { id: true, fileName: true, createdAt: true },
        });
        res.json(resumes);
    }
    catch (err) {
        next(err);
    }
});
// POST /api/resume/enhance-section
router.post('/enhance-section', authenticate, async (req, res, next) => {
    try {
        const { section, content } = req.body;
        if (!section || !content)
            throw new AppError('section and content are required', 400);
        // Placeholder — real impl would call Claude
        const enhanced = `[Enhanced] ${content}`;
        res.json({ enhanced });
    }
    catch (err) {
        next(err);
    }
});
// POST /api/resume/cover-letter
router.post('/cover-letter', authenticate, async (req, res, next) => {
    try {
        const { targetRole, company } = req.body;
        if (!targetRole || !company)
            throw new AppError('targetRole and company are required', 400);
        // Placeholder — real impl would call Claude
        const coverLetter = `Dear Hiring Manager at ${company},\n\nI am excited to apply for the ${targetRole} position...\n\nSincerely,\n[Your Name]`;
        res.json({ coverLetter });
    }
    catch (err) {
        next(err);
    }
});
export default router;
//# sourceMappingURL=resume.js.map