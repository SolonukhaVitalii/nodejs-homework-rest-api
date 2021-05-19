const { UsersRepository } = require('../repository/users');
const jimp = require('jimp');
const path = require('path');
const fs = require('fs/promises');

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

  async uploadAvatar(userId, file) {
    const user = await this.findById(userId);
    const PUBLIC_DIR = path.join(process.cwd(), 'public', 'avatars');

    const img = await jimp.read(file.path);

    const imgName = `${user.email}-${Date.now()}-${file.originalname}`;

    await img
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE,
      )
      .writeAsync(file.path);

    await fs.rename(file.path, path.join(PUBLIC_DIR, imgName));

    const url = `/avatars/${imgName}`;

    await this.usersRepository.updateAvatarById(userId, { avatarURL: url });

    return url;
  }
}

module.exports = { UserServices };