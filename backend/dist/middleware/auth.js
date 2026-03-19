import jwt from 'jsonwebtoken';
import { prisma } from '../utils/database.js';
import { AppError } from './errorHandler.js';
export async function authenticate(req, _res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            throw new AppError('No token provided', 401);
        }
        const token = authHeader.slice(7);
        const secret = process.env.JWT_SECRET;
        if (!secret)
            throw new AppError('Server misconfiguration', 500);
        const decoded = jwt.verify(token, secret);
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, email: true, role: true },
        });
        if (!user)
            throw new AppError('User not found', 401);
        req.user = user;
        next();
    }
    catch (err) {
        if (err instanceof AppError) {
            next(err);
        }
        else {
            next(new AppError('Invalid or expired token', 401));
        }
    }
}
export function requireAdmin(req, _res, next) {
    if (req.user?.role !== 'ADMIN') {
        next(new AppError('Admin access required', 403));
        return;
    }
    next();
}
//# sourceMappingURL=auth.js.map