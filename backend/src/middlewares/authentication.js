const jwt = require("jsonwebtoken");
const { Unauthenticated } = require("../../config/errors");
const client = require("../../config/database/redis");
const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthenticated("No token provided");
  }
  const token = authHeader.split(" ")[1];
  //const isBlocked = await client.sIsMember("token_blocking_list", token);
  const isBlocked = await client.exists(`${token}`);
  if (isBlocked) {
    throw new Unauthenticated("Session blocked");
  }
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (!decoded.active) {
    throw new Unauthenticated("Inactive User");
  }
  req.role = decoded.role;
  next();
};

module.exports = authenticationMiddleware;
