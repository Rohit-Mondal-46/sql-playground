import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs';
import path from 'path';

export async function runQuery(query, playgroundId) {
  const dbDir = path.join(process.cwd(), 'dbs');
  const dbPath = path.join(dbDir, `${playgroundId}.sqlite`);

  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir);
  }

  const db = await open({ filename: dbPath, driver: sqlite3.Database });

  try {
    const rows = await db.all(query);
    return { success: true, rows };
  } catch (err) {
    return { success: false, error: err.message };
  } finally {
    await db.close();
  }
}
