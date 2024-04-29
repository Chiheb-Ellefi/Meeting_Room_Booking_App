const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { Sequelize, Op } = require("sequelize");

// Register User Service
const register = async (credentials) => {
  const user = await User.create(credentials);
  return user;
};

//find User Service
const findUser = (options) => {
  return User.findOne({ where: options });
};

// Compare Password Service
const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

// Create Refresh Token Service
const createRefreshToken = ({ user_id, email }) => {
  const token = jwt.sign({ user_id, email }, process.env.REFRESH_SECRET);
  return {
    token,
    user_id,
  };
};

// Create Access Token Service
const createAccessToken = ({ user_id, email, role, active }) => {
  const token = jwt.sign(
    { user_id, role, email, active },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_LIFETIME,
    }
  );
  return {
    token,
    expires_at: process.env.ACCESS_TOKEN_LIFETIME,
  };
};

const getAll = async (search, limit, sort, offset, filter) => {
  const whereClause = {
    [Op.and]: [
      search
        ? Sequelize.or(
            {
              email: {
                [Op.like]: `%${search}%`,
              },
            },
            {
              username: {
                [Op.like]: `%${search}%`,
              },
            }
          )
        : {},
      filter ? { ...JSON.parse(filter) } : {},
    ],
  };

  const users = await User.findAll({
    where: whereClause,
    order:
      sort === "A-Z"
        ? [["username", "ASC"]]
        : sort === "Z-A"
        ? [["username", "DESC"]]
        : [["createdAt", "DESC"]],
    limit: limit,
    offset,
  });
  const count = await User.count({ where: whereClause });

  return { users, count };
};

const updateOne = async (details, options) => {
  return await User.update(details, { where: options });
};
const deleteOne = async (options) => {
  return await User.destroy({ where: options, cascade: true });
};
module.exports = {
  register,
  comparePassword,
  createRefreshToken,
  createAccessToken,
  findUser,
  getAll,
  updateOne,
  deleteOne,
};
