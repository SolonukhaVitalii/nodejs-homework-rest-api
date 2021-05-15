const User = require('../schemas/schema-user');

class UsersRepository {
  constructor() {
    this.userModel = User;
  }

  async findByEmail(email) {
    const result = await this.userModel.findOne({ email });
    return result;
  }

  async findById(id) {
    const result = await this.userModel.findById(id);
    return result;
  }

  async create(body) {
    const user = new this.userModel(body);

    return user.save();
  }

  async updateToken(id, token) {
    await this.userModel.updateOne({ _id: id }, { token });
  }

  async updateSubscriptionById(userId, body) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { ...body },
      {
        new: true,
      },
    );

    return updatedUser;
  }
}

module.exports = { UsersRepository };