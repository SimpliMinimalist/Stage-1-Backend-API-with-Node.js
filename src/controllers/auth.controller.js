const AuthService = require("../services/auth.service");
const ApiResponse = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");
const register = catchAsync(async (req, res) => {
  const { username, email, password, address } = req.body;
  const user = await AuthService.register({
    username,
    email,
    password,
    address,
  });
  ApiResponse.created("User registered successfully", {
    user,
  }).send(res);
});
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await AuthService.login(email, password);
  ApiResponse.ok("Login successful", {
    user,
    token,
  }).send(res);
});
module.exports = {
  register,
  login,
};
