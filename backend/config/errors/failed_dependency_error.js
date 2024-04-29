const { StatusCodes } = require("http-status-codes");
const CustomError = require("./custom_error");

class FailedDependency extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FAILED_DEPENDENCY;
  }
}
module.exports = FailedDependency;
