const { UsersRepository } = require('../repository/users');

class UserServices {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async create(body) {
    const data = await this.usersRepository.create(body);
    return data;
  }

  async findByEmail(email) {
    const data = await this.usersRepository.findByEmail(email);
    return data;
  }

  async findById(id) {
    const data = await this.usersRepository.findById(id);
    return data;
  }

  async updateSubscriptionById(userId, body) {
    const data = await this.usersRepository.updateSubscriptionById(
      userId,
      body,
    );
    return data;
  }
}

module.exports = { UserServices };