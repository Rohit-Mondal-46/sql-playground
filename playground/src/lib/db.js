import Database from 'better-sqlite3';
import { v4 as uuid } from 'uuid';
import path from 'path';
let db;

try {
  db = new Database(path.join(process.cwd(), 'playgrounds.db'));
  db.exec(`
    CREATE TABLE IF NOT EXISTS playgrounds (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      history TEXT DEFAULT '[]'
    );
  `);
} catch (err) {
  console.error('Database initialization error:', err);
  throw err;
}

export function createPlayground(title) {
  const id = uuid(), ts = new Date().toISOString();
  db.prepare('INSERT INTO playgrounds VALUES (?,?,?,?)').run(id, title, ts, JSON.stringify([]));
  return { id, title, createdAt: ts, history: [] };
}
export function getAllPlaygrounds() {
  return db.prepare('SELECT * FROM playgrounds ORDER BY createdAt DESC').all()
    .map(r => ({ ...r, history: JSON.parse(r.history) }));
}
export function renamePlayground(id, title) {
  db.prepare('UPDATE playgrounds SET title=? WHERE id=?').run(title, id);
  return getAllPlaygrounds().find(r => r.id === id);
}
export function deletePlayground(id) {
  db.prepare('DELETE FROM playgrounds WHERE id=?').run(id);
}
export function addHistory(id, query) {
  const pl = db.prepare('SELECT history FROM playgrounds WHERE id=?').get(id);
  const arr = JSON.parse(pl.history);
  arr.push({ query, timestamp: new Date().toISOString() });
  db.prepare('UPDATE playgrounds SET history=? WHERE id=?').run(JSON.stringify(arr), id);
}
