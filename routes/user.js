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
      const authKey = generateKey();
      const hashed_password = bcrypt.hashSync(password, 10);

      // Вставляем данные в таблицу users
      db.run(
        `
          INSERT INTO users (name, birthdate, phone, auth_key, hashed_password)
          VALUES (?, ?, ?, ?, ?);
        `,
        [
          name,
          birthdate,
          phone,
          authKey,
          hashed_password,
        ],
        err => {
          if (err) {
            console.error(err);
            res.status(500).send('Ошибка базы данных');
          } else {
            // Получаем идентификатор только что добавленного пользователя
            db.get('SELECT id FROM users WHERE name = ?', [name], (err, row) => {
              if (err) {
                console.error(err);
                res.status(500).send('Ошибка базы данных');
              } else {
                const userId = row.id;

                // Вставляем данные в таблицу documents
                db.run(
                  `
                    INSERT INTO documents (series, number, issue_date, person_id)
                    VALUES (?, ?, ?, ?);
                  `,
                  [
                    document.series,
                    document.number,
                    document.issueDate,
                    userId,
                  ],
                  err => {
                    if (err) {
                      console.error(err);
                      res.status(500).send('Ошибка базы данных');
                    } else {
                      // Вставляем данные в таблицу works
                      db.run(
                        `
                          INSERT INTO works (firm_name, phone, address, person_id)
                          VALUES (?, ?, ?, ?);
                        `,
                        [
                          work.firmName,
                          work.phone,
                          work.address,
                          userId,
                        ],
                        err => {
                          if (err) {
                            console.error(err);
                            res.status(500).send('Ошибка базы данных');
                          } else {
                            const newUser = new User(
                              userId,
                              name,
                              birthdate,
                              phone,
                              document,
                              work,
                              hashed_password,
                              authKey,
                            )
                            res.send(newUser);
                          }
                        },
                      );
                    }
                  },
                );
              }
            });
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
