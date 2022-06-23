const pool = require('../utils/pool');

class Secret {
  id;
  title;
  description;
  created_at;
  constructor(row) {
    for (const key of Object.keys(row)) {
      this[key] = row[key];
    }
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM secrets;');
    return rows.map((row) => new Secret(row));
  }
}

module.exports = Secret;
