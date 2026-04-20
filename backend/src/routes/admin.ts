import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import rateLimit from 'express-rate-limit';
import { requireAdmin } from '../auth';
import * as db from '../db';
import { Guest, Invitation } from '../types';
import { sanitize } from '../validation';

const router = Router();

// Stricter rate limit on login: 10 attempts per 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts, try again later' },
});

router.post('/login', loginLimiter, (req: Request, res: Response) => {
  const { password } = req.body as { password?: string };
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    res.status(401).json({ error: 'Invalid password' });
    return;
  }
  res.json({ ok: true });
});

router.get('/invitations', requireAdmin, (_req: Request, res: Response) => {
  res.json(db.readAll());
});

router.post('/invitations', requireAdmin, (req: Request, res: Response) => {
  const { guestNames } = req.body as { guestNames?: string[] };
  if (!guestNames || !Array.isArray(guestNames) || guestNames.length === 0) {
    res.status(400).json({ error: 'guestNames is required and must not be empty' });
    return;
  }

  if (guestNames.length > 20) {
    res.status(400).json({ error: 'Too many guests per invitation (max 20)' });
    return;
  }

  const guests: Guest[] = guestNames.map((name) => {
    const cleaned = sanitize(String(name));
    if (!cleaned) {
      throw new Error('Guest name cannot be empty after sanitization');
    }
    return {
      id: crypto.randomUUID(),
      name: cleaned,
      attending: null,
      diet: null,
    };
  });

  const invitation: Invitation = {
    id: crypto.randomUUID(),
    token: crypto.randomBytes(8).toString('hex'),
    guests,
    createdAt: new Date().toISOString(),
    respondedAt: null,
  };

  db.save(invitation);
  res.status(201).json(invitation);
});

router.delete('/invitations/:token', requireAdmin, (req: Request, res: Response) => {
  const removed = db.remove(req.params.token);
  if (!removed) {
    res.status(404).json({ error: 'Invitation not found' });
    return;
  }
  res.json({ ok: true });
});

export default router;
