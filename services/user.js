const User = require("../models/user");

module.exports = class UserService {
  static async findUserByEmail(email) {
    return User.findOne({ where: { email } });
  }

  static async findUserById(id) {
    return User.findOne({ where: { id } });
  }

  static async createUser(user) {
    return User.create(user);
  }
};
