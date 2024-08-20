import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./db/users.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      birthdate TEXT NOT NULL,
      phone TEXT NOT NULL,
      document_series TEXT NOT NULL,
      document_number TEXT NOT NULL,
      document_issue_date TEXT NOT NULL,
      work_firm_name TEXT NOT NULL,
      work_phone TEXT NOT NULL,
      work_address TEXT NOT NULL,
      auth_key TEXT NOT NULL,
      hashed_password TEXT NOT NULL
      )
  `);
});

export default db;
