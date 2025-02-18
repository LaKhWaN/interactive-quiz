import { openDB } from 'idb';

const DB_NAME = 'quiz-platform';
const STORE_NAME = 'quiz-attempts';

export async function initDB() {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
  return db;
}

export async function saveQuizAttempt(attempt) {
  const db = await initDB();
  return db.add(STORE_NAME, attempt);
}

export async function getQuizAttempts() {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}

export async function clearQuizAttempts() {
  const db = await initDB();
  return db.clear(STORE_NAME);
}
