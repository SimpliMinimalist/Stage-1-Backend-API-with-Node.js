const UserService = require("../services/user.service");
const ApiResponse = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");
const getUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await UserService.getUserById(parseInt(id, 10));
  ApiResponse.ok("User retrieved successfully", {
    user,
  }).send(res);
});
module.exports = {
  getUser,
};
