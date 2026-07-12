const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const config = require("../config");
const SALT_ROUNDS = 12;
class AuthService {
  static async register({ username, email, password, address }) {
    const existingEmail = await UserModel.findByEmail(email);
    if (existingEmail) {
      throw ApiError.conflict("A user with this email already exists");
    }
    const existingUsername = await UserModel.findByUsername(username);
    if (existingUsername) {
      throw ApiError.conflict("A user with this username already exists");
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      address,
    });
    return user;
  }
  static async login(email, password) {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw ApiError.unauthorized("Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw ApiError.unauthorized("Invalid email or password");
    }
    const token = jwt.sign(
      {
        userId: user.id,
      },
      config.jwt.secret,
      {
        expiresIn: config.jwt.expiresIn,
      },
    );
    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token,
    };
  }
}
module.exports = AuthService;
