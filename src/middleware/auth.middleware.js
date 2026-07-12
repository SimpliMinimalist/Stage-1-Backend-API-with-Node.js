const jwt = require("jsonwebtoken");
const config = require("../config");
const ApiError = require("../utils/ApiError");
const authenticate = (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw ApiError.unauthorized("Access denied. No token provided");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw ApiError.unauthorized("Access denied. No token provided");
    }
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (error.name === "JsonWebTokenError") {
      throw ApiError.unauthorized("Invalid token");
    }
    if (error.name === "TokenExpiredError") {
      throw ApiError.unauthorized("Token has expired");
    }
    throw ApiError.unauthorized("Authentication failed");
  }
};
module.exports = authenticate;
