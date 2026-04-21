import { Router, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import * as db from '../db';
import { Guest } from '../types';
import { isValidDiet } from '../validation';

const router = Router();

// Rate limit RSVP submissions: 20 per 15 minutes per IP
const rsvpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, try again later' },
});

router.get('/:token', (req: Request, res: Response) => {
  const invitation = db.findByToken(req.params.token);
  if (!invitation) {
    res.status(404).json({ error: 'Invitation not found' });
    return;
  }
  res.json(invitation);
});

router.put('/:token/rsvp', rsvpLimiter, (req: Request, res: Response) => {
  const invitation = db.findByToken(req.params.token);
  if (!invitation) {
    res.status(404).json({ error: 'Invitation not found' });
    return;
  }

  const { guests, bringingFurBaby } = req.body as { guests?: Guest[]; bringingFurBaby?: unknown };
  if (!guests || !Array.isArray(guests)) {
    res.status(400).json({ error: 'guests array is required' });
    return;
  }
  if (typeof bringingFurBaby !== 'boolean') {
    res.status(400).json({ error: 'bringingFurBaby (boolean) is required' });
    return;
  }

  // Validate and merge guest responses
  const updatedGuests = invitation.guests.map((original) => {
    const response = guests.find((g) => g.id === original.id);
    if (!response) return original;

    const diet = isValidDiet(response.diet) ? response.diet : original.diet;

    return {
      ...original,
      attending:
        typeof response.attending === 'boolean'
          ? response.attending
          : original.attending,
      diet,
    };
  });

  const updated = {
    ...invitation,
    guests: updatedGuests,
    bringingFurBaby,
    respondedAt: new Date().toISOString(),
  };

  db.save(updated);
  res.json(updated);
});

export default router;
