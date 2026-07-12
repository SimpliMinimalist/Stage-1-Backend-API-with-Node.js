const UserModel = require("../models/user.model");
const ApiError = require("../utils/ApiError");
class UserService {
  static async getUserById(id) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw ApiError.notFound(`User with ID ${id} not found`);
    }
    return user;
  }
}
module.exports = UserService;
