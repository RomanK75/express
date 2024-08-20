class User {
  constructor(id, name, birthdate, phone, document, work,hashed_password, authKey) {
    this.id = id;
    this.name = name;
    this.birthdate = birthdate;
    this.phone = phone;
    this.document = document;
    this.work = work;
    this.hashed_password = hashed_password
    this.authKey = authKey;
  }
}

export default User;
