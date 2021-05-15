const { UsersRepository } = require('../repository/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_WORD = process.env.JWT_SECRET_KEY;

class AuthServices {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async login({ email, password }) {
    const user = await this.usersRepository.findByEmail(email);
    const valid = await user.validPassword(password);

    if (!user || !valid) {
      return null;
    }

    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_WORD, { expiresIn: '1h' });

    await this.usersRepository.updateToken(id, token);

    return {
      token,
      user: { email: user.email, subscription: user.subscription },
    };
  }

  async logout(id) {
    const data = await this.usersRepository.updateToken(id, null);
    return data;
  }

  async current(email) {
    const user = await this.usersRepository.findByEmail(email);

    return { email: user.email, subscription: user.subscription };
  }
}

module.exports = { AuthServices };