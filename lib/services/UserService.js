const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = class UserService {
  static async create({ name, email, password }) {
    if (!(name || email || password))
      throw new Error('Please send valid inputs');
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    const user = await User.insert({
      name,
      email,
      passwordHash,
    });

    return user;
  }
};
