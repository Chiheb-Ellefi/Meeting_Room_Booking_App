const { Unauthenticated } = require("../../config/errors");

const checkForAdminMiddleware = (req, res, next) => {
  const role = req.role;
  if (!(role == "admin")) {
    throw new Unauthenticated("User not authorized for this action!!");
  }
  next();
};

module.exports = checkForAdminMiddleware;
