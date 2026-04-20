import { Request, Response, NextFunction } from 'express';

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const password = process.env.ADMIN_PASSWORD;
  const provided =
    req.headers['x-admin-password'] ||
    (req.headers['authorization'] || '').replace('Bearer ', '');

  if (!provided || provided !== password) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  next();
}
