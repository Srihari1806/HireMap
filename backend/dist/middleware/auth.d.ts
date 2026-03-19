import type { Request, Response, NextFunction } from 'express';
export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
    };
}
export declare function authenticate(req: AuthRequest, _res: Response, next: NextFunction): Promise<void>;
export declare function requireAdmin(req: AuthRequest, _res: Response, next: NextFunction): void;
