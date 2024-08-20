
Тестовое задание
================

### Задание

Написать API для регистрации и авторизации пользователей на основе данных, которые будут приходить с клиента.

### Стек

* Node.js
* Express.js

### Задания

#### 1. Модель данных

Требуется хранить следующие данные:

* ФИО
* Дата рождения
* Телефон
* Данные документа удостоверяющего личность (серия, номер, дата выдачи)
* Данные о работе (Название фирмы, номер телефона, адрес)
* Ключ для авторизации

Модель данных должна быть отрисована в формате диаграммы классов UML. Для простоты из связей использовать только ассоциация, а связи между сущностями могут быть или 1-1 или 1-_.

#### 2. Реализация функций-конструкторов

Реализовать функции-конструкторы под каждую сущность. Они должны храниться в папке `models`.

#### 3. Генератор ключей

Реализовать генератор ключей. Он должен генерировать рандомную последовательность чисел, букв или символов. Сохранить его в папке `utils`.

#### 4. Реализация routes

Реализовать следующие routes:

* `/user/register` - должен получать данные сведения о регистрируемом пользователе и сохранять их в БД с присвоением ключа для авторизации (в рамка тестового задания можно хранить их в отдельном файле в формате json в папке `db`).
* `/user/login` - должен получать логин и пароль пользователя, искать пользователя в хранилище созданом в рамках задания 4.1. Если пользователь найден, то должен возвращаться 200 статус и ключ авторизация пользователя, если нет, то 403 с сообщением, что пользователь не найден.

#### 5. Выгрузка проекта в git

Выгрузить проект в git.

### Пример запроса
Проверка пользователя при регистрации происходит по 
данным с документа (номер/серия)

* POST `/user/register`:
```json
{
  "name": "Иван Иванов",
  "password": "password123",
  "birthdate": "1990-01-01",
  "phone": "+7 999 123 45 67",
  "document": {
    "series": "1234",
    "number": "567890",
    "issueDate": "2010-01-01"
  },
  "work": {
    "firmName": "ООО FirmA",
    "phone": "+7 999 901 23 45",
    "address": "Москва, ул. Ленина, д. 1"
  }
}
```