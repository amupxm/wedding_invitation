import fs from 'fs';
import path from 'path';
import lockfile from 'proper-lockfile';
import { Invitation } from './types';

const DEFAULT_DB_PATH = path.resolve(__dirname, '..', 'data', 'invitations.json');
const DB_PATH = path.resolve(process.env.DB_PATH || DEFAULT_DB_PATH);
// lockSync cannot use retries (proper-lockfile throws "Cannot use retries with the sync api").
// Default lock() options (stale/update/realpath) still apply inside the library.
const LOCK_OPTIONS = {};

function ensureDbExists(): void {
  if (!fs.existsSync(DB_PATH)) {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, '[]', 'utf-8');
  }
}

export function getDbPath(): string {
  return DB_PATH;
}

export function readAll(): Invitation[] {
  ensureDbExists();
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw) as Invitation[];
  } catch (err) {
    console.error('Failed to read DB:', err);
    // If JSON is corrupted, try to recover from backup
    const backupPath = DB_PATH + '.bak';
    if (fs.existsSync(backupPath)) {
      console.log('Attempting recovery from backup...');
      const raw = fs.readFileSync(backupPath, 'utf-8');
      return JSON.parse(raw) as Invitation[];
    }
    return [];
  }
}

function writeAllUnsafe(invitations: Invitation[]): void {
  ensureDbExists();
  // Write backup before overwriting
  if (fs.existsSync(DB_PATH)) {
    fs.copyFileSync(DB_PATH, DB_PATH + '.bak');
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(invitations, null, 2), 'utf-8');
}

export function findByToken(token: string): Invitation | undefined {
  return readAll().find((inv) => inv.token === token);
}

export function save(invitation: Invitation): void {
  ensureDbExists();
  const release = lockfile.lockSync(DB_PATH, LOCK_OPTIONS);
  try {
    const all = readAll();
    const idx = all.findIndex((inv) => inv.id === invitation.id);
    if (idx >= 0) {
      all[idx] = invitation;
    } else {
      all.push(invitation);
    }
    writeAllUnsafe(all);
  } finally {
    release();
  }
}

export function remove(token: string): boolean {
  ensureDbExists();
  const release = lockfile.lockSync(DB_PATH, LOCK_OPTIONS);
  try {
    const all = readAll();
    const filtered = all.filter((inv) => inv.token !== token);
    if (filtered.length === all.length) return false;
    writeAllUnsafe(filtered);
    return true;
  } finally {
    release();
  }
}

export function resetAll(): void {
  ensureDbExists();
  const release = lockfile.lockSync(DB_PATH, LOCK_OPTIONS);
  try {
    writeAllUnsafe([]);
  } finally {
    release();
  }
}
