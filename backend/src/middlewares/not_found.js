const { StatusCodes } = require("http-status-codes");

const NotFoundMiddleware = (req, res) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ message: "Sorry but this route is not available ." });
};
module.exports = NotFoundMiddleware;
