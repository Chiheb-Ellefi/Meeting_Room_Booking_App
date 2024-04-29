const { Room } = require("../models");
const { Sequelize, Op } = require("sequelize");
const getAll = async (search, limit, offset, filter) => {
  const whereClause = {
    [Op.and]: [
      search
        ? Sequelize.or(
            {
              details: {
                name: {
                  [Op.like]: `%${search}%`,
                },
              },
            },
            {
              details: {
                location: {
                  [Op.like]: `%${search}%`,
                },
              },
            },
            {
              details: {
                site: {
                  [Op.like]: `%${search}%`,
                },
              },
            }
          )
        : {},
      filter ? { ...JSON.parse(filter) } : {},
    ],
  };
  const rooms = await Room.findAll({
    where: whereClause,
    limit: limit,
    offset,
  });
  const count = await Room.count({ where: whereClause });

  return { rooms, count };
};

const getOne = async (options) => {
  return await Room.findOne({ where: options });
};

const addOne = async (room) => {
  return await Room.create({ ...room });
};
const updateOne = async (details, options) => {
  return await Room.update(details, { where: options });
};

const deleteOne = async (options) => {
  return await Room.destroy({ where: options, cascade: true });
};

module.exports = { getAll, getOne, addOne, updateOne, deleteOne };
