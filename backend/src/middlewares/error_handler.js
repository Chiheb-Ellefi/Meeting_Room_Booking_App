const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  let CustomError = {
    message: err.message || "An error occured ,try again later",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (err.name === "SequelizeUniqueConstraintError") {
    CustomError.statusCode = StatusCodes.CONFLICT;

    CustomError.message = err["parent"]["detail"];
  }
  if (err.name === "SequelizeValidationError") {
    CustomError.message = err["errors"]
      .map((error) => error.message)
      .join(" && ");
    CustomError.statusCode = StatusCodes.CONFLICT;
  }
  if (err.name === "TokenExpiredError") {
    CustomError.message = err.message;
    CustomError.statusCode = StatusCodes.FORBIDDEN;
  }
  if (err.name === "SequelizeForeignKeyConstraintError") {
    CustomError.statusCode = StatusCodes.CONFLICT;
    CustomError.message = err.parent.detail;
  }

  res.status(CustomError.statusCode).json({ Error: CustomError.message });
};

module.exports = errorHandler;
