// user.js
import express from 'express';
import User from '../models/userModel.js';
import Document from '../models/document.js';
import Work from '../models/work.js';
import generateKey from '../utils/keyGen.js';
import db from '../db/db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/register', (req, res) => {
  const { name, birthdate, phone, document, work, password } = req.body;
  db.get('SELECT * FROM users WHERE name = ?', [name], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).send('Ошибка базы данных');
    } else if (row) {
      res.status(400).send('Пользователь уже зарегистрирован');
    } else {
      const hashed_password = bcrypt.hashSync(password, 10);
      const newUser = new User(
        null,
        name,
        birthdate,
        phone,
        new Document(document.series, document.number, document.issueDate),
        new Work(work.firmName, work.phone, work.address),
        generateKey(),
        hashed_password,
      );
      db.run(
        `
        INSERT INTO users (name, birthdate, phone, document_series, document_number, document_issue_date, work_firm_name, work_phone, work_address, auth_key, hashed_password)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `,
        [
          name,
          birthdate,
          phone,
          document.series,
          document.number,
          document.issueDate,
          work.firmName,
          work.phone,
          work.address,
          newUser.authKey,
          hashed_password,
        ],
        err => {
          if (err) {
            console.error(err);
            res.status(500).send('Ошибка базы данных');
          } else {
            res.send(newUser);
          }
        },
      );
    }
  });
});

router.post('/login', (req, res) => {
  const { name, password } = req.body;
  db.get('SELECT * FROM users WHERE name = ?', [name], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).send('Ошибка базы данных');
    } else if (row) {
      const isValid = bcrypt.compareSync(password, row.hashed_password);
      if (isValid) {
        res.status(200).send(row.auth_key);
      } else {
        res.status(403).send('Неправильный пароль');
      }
    } else {
      res.status(403).send('Пользователь не найден');
    }
  });
});

export default router;
