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

    if (!user.verify) {
      throw new Error('First confirm your email');
    }

    if (!user || !valid) {
      return null;
    }

    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_WORD, { expiresIn: '1h' });

    await this.usersRepository.updateToken(id, token);

    return {
      token,
      user: {
        name: user.name,
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
      },
    };
  }

  async logout(id) {
    const data = await this.usersRepository.updateToken(id, null);
    return data;
  }

  async current(email) {
    const user = await this.usersRepository.findByEmail(email);

    return {
      name: user.name,
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    };
  }
}

module.exports = { AuthServices };