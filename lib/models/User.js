const pool = require('../utils/pool');

module.exports = class User {
  id;
  email;
  name;
  #passwordHash;
  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.email = row.email;
    this.#passwordHash = row.password_hash;
  }

  static async getUser(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email=$1', [
      email,
    ]);
    return rows[0] ? new User(rows[0]) : null;
  }

  static async insert({ name, email, passwordHash }) {
    const { rows } = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1,$2,$3) RETURNING *',
      [name, email, passwordHash]
    );
    return new User(rows[0]);
  }

  get passwordHash() {
    return this.#passwordHash;
  }
};
