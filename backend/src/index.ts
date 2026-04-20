import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import adminRouter from './routes/admin';
import invitationsRouter from './routes/invitations';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);

// Security headers
app.use(helmet());

// CORS — allow configured origin or fallback to localhost for dev
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: allowedOrigin }));

// Request logging
app.use(morgan('short'));

// Body parsing with size limit
app.use(express.json({ limit: '16kb' }));

// Global rate limit: 100 requests per minute per IP
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/admin', adminRouter);
app.use('/api/invitations', invitationsRouter);

// Global error handler
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error('Unhandled error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
);

// Graceful shutdown
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

function shutdown() {
  console.log('Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
  // Force exit after 5s if connections won't close
  setTimeout(() => process.exit(1), 5000);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
