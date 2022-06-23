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
}

module.exports = Secret;
