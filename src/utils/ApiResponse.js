class ApiResponse {
  constructor(statusCode, message, data = null) {
    this.success = true;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }
  send(res) {
    return res.status(this.statusCode).json({
      success: this.success,
      message: this.message,
      data: this.data,
    });
  }
  static ok(message, data) {
    return new ApiResponse(200, message, data);
  }
  static created(message, data) {
    return new ApiResponse(201, message, data);
  }
}
module.exports = ApiResponse;
