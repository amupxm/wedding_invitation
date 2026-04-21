import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { getDbPath, resetAll } from './db';

dotenv.config();

function main(): void {
  const dbPath = getDbPath();
  const backupPath = `${dbPath}.reset-${new Date().toISOString().replace(/[:.]/g, '-')}.bak`;

  if (fs.existsSync(dbPath)) {
    const dir = path.dirname(backupPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.copyFileSync(dbPath, backupPath);
  }

  resetAll();
  console.log(`Database reset completed: ${dbPath}`);
  console.log(`Backup created at: ${backupPath}`);
}

main();
