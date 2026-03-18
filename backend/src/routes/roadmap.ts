import { Router } from 'express';
import type { Response } from 'express';
import { authenticate, type AuthRequest } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';
import { prisma } from '../utils/database.js';

const router = Router();

// POST /api/roadmap/generate
router.post('/generate', authenticate, async (req: AuthRequest, res: Response, next) => {
  try {
    const { targetRole, targetCompany, durationWeeks = 8, currentSkills = [] } =
      req.body as {
        targetRole: string;
        targetCompany?: string;
        durationWeeks?: number;
        currentSkills?: string[];
      };

    if (!targetRole) throw new AppError('targetRole is required', 400);

    // Generate a simple 4-week roadmap (real impl calls Claude)
    const weeks = Array.from({ length: Math.min(durationWeeks, 4) }, (_, i) => ({
      id: `week-${i + 1}`,
      weekNumber: i + 1,
      title: `Week ${i + 1}: ${['Foundation', 'Core Skills', 'Projects', 'Interview Prep'][i] ?? 'Advanced'}`,
      focus: `Build skills for ${targetRole}`,
      tasks: [
        { id: `t${i}1`, text: 'Study core concepts', type: 'learn' as const, done: false, estimatedHours: 5 },
        { id: `t${i}2`, text: 'Build a project', type: 'build' as const, done: false, estimatedHours: 8 },
      ],
      resources: [],
      completed: false,
    }));

    const roadmap = await prisma.roadmap.create({
      data: {
        userId: req.user!.id,
        title: `${targetRole} Roadmap`,
        targetRole,
        targetCompany,
        durationWeeks,
        skillGaps: [],
        weeks: weeks as unknown as never,
        progress: 0,
      },
    });

    res.status(201).json({
      roadmap: { ...roadmap, weeks },
      skillGap: {
        targetRole, userSkills: currentSkills,
        requiredSkills: [], matchScore: 60,
        missingSkills: [], niceToHaveSkills: [],
        estimatedWeeksToClose: durationWeeks,
      },
      message: 'Roadmap generated successfully',
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/roadmap
router.get('/', authenticate, async (req: AuthRequest, res: Response, next) => {
  try {
    const roadmaps = await prisma.roadmap.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(roadmaps);
  } catch (err) {
    next(err);
  }
});

// GET /api/roadmap/:id
router.get('/:id', authenticate, async (req: AuthRequest, res: Response, next) => {
  try {
    const roadmap = await prisma.roadmap.findFirst({
      where: { id: req.params['id'], userId: req.user!.id },
    });
    if (!roadmap) throw new AppError('Roadmap not found', 404);
    res.json(roadmap);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/roadmap/:id/week/:weekId/task
router.patch('/:id/week/:weekId/task', authenticate, async (req: AuthRequest, res: Response, next) => {
  try {
    const { taskId, done } = req.body as { taskId: string; done: boolean };
    const roadmap = await prisma.roadmap.findFirst({
      where: { id: req.params['id'], userId: req.user!.id },
    });
    if (!roadmap) throw new AppError('Roadmap not found', 404);

    // Update task in JSON (simplified)
    res.json({ message: 'Task updated', taskId, done });
  } catch (err) {
    next(err);
  }
});

// POST /api/roadmap/skill-gap
router.post('/skill-gap', authenticate, async (req: AuthRequest, res: Response, next) => {
  try {
    const { targetRole } = req.body as { targetRole: string; jobId?: string };
    if (!targetRole) throw new AppError('targetRole is required', 400);

    res.json({
      targetRole,
      userSkills: [],
      requiredSkills: ['Relevant Skill 1', 'Relevant Skill 2'],
      matchScore: 50,
      missingSkills: ['Relevant Skill 1'],
      niceToHaveSkills: [],
      estimatedWeeksToClose: 8,
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/roadmap/:id
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response, next) => {
  try {
    await prisma.roadmap.deleteMany({
      where: { id: req.params['id'], userId: req.user!.id },
    });
    res.json({ message: 'Roadmap deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
