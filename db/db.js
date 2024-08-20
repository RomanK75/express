import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./db/users.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      birthdate TEXT NOT NULL,
      phone TEXT NOT NULL,
      auth_key TEXT NOT NULL,
      hashed_password TEXT NOT NULL
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      series TEXT NOT NULL,
      number TEXT NOT NULL,
      issue_date TEXT NOT NULL,
      person_id INTEGER NOT NULL,
      FOREIGN KEY (person_id) REFERENCES users (id)
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS works (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firm_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT NOT NULL,
      person_id INTEGER NOT NULL,
      FOREIGN KEY (person_id) REFERENCES users (id)
    );
  `);

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_users_id ON users (id);
    CREATE INDEX IF NOT EXISTS idx_documents_person_id ON documents (person_id);
    CREATE INDEX IF NOT EXISTS idx_works_person_id ON works (person_id);
  `);
});

export default db;