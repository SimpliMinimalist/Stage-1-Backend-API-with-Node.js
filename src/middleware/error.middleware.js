const ApiError = require("../utils/ApiError");
const config = require("../config");

const errorHandler = (err, _req, res, _next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";
  let errors = err.errors || [];
  let status = err.status || "error";

  if (statusCode >= 500) {
    console.error("ERROR:", {
      message: err.message,
      stack: err.stack,
      statusCode,
    });
  }

  if (err.code === "ER_DUP_ENTRY") {
    statusCode = 409;
    status = "fail";
    message = "A record with this value already exists";
    errors = [];
  }

  if (err.type === "entity.parse.failed") {
    statusCode = 400;
    status = "fail";
    message = "Invalid JSON in request body";
    errors = [];
  }

  if (config.server.env === "production" && !err.isOperational) {
    statusCode = 500;
    status = "error";
    message = "Something went wrong";
    errors = [];
  }

  res.status(statusCode).json({
    success: false,
    status,
    message,
    ...(errors.length > 0 && { errors }),
    ...(config.server.env === "development" &&
      statusCode >= 500 && { stack: err.stack }),
  });
};

module.exports = errorHandler;
