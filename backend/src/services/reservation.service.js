const { sequelize } = require("../../config/database/database");
const { QueryTypes } = require("sequelize");
const { Reservation } = require("../models");

const addOne = async (options) => {
  return await Reservation.create(options);
};
const getAll = async ({ valid }) => {
  return await Reservation.findAll({ where: { valid } });
};

const getAllRes = async ({ valid, offset, sort, search }) => {
  const whereClause = [];

  if (search != "") {
    whereClause.push("");
  }
  if (valid == "false") {
    whereClause.push(`valid = false`);
  }
  if (valid == "true") {
    whereClause.push(`valid = true`);
  }
  const query = `
    SELECT rooms.details->'name' AS room_name,
    rooms.room_id,
           reservations.checkin,
           reservations.checkout,
           reservations.res_id,
           reservations.user_id,
           reservations.cancelled,
           reservations.valid,
           users.username
    FROM reservations
    INNER JOIN rooms USING(room_id)
    LEFT JOIN users ON reservations.user_id = users.user_id
    ${
      whereClause.length > 0
        ? `WHERE ${
            search != "" ? ` lower(username) like '%${search}%'` : ""
          } ${whereClause.join(" AND ")}`
        : ""
    } ORDER BY ${sort ? sort : "valid Desc"} ${`LIMIT 10 OFFSET ${
    offset ? offset : "0"
  }`} ;
  `;

  const reservations = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
  const numberReservationsQuery = `
    SELECT count(*) 
    FROM reservations
    LEFT JOIN users ON reservations.user_id = users.user_id
    ${
      whereClause.length > 0
        ? `WHERE ${
            search != "" ? ` lower(username) like '%${search}%'` : ""
          } ${whereClause.join(" AND ")}`
        : ""
    }  ;
  `;
  const nbrRes = await sequelize.query(numberReservationsQuery, {
    type: QueryTypes.SELECT,
  });
  return { reservations, nbrRes };
};
const getAllDetails = async ({ user_id, room_id }) => {
  const whereClause = ["valid=true"];

  if (user_id) {
    whereClause.push(`reservations.user_id = :user_id`);
  }

  if (room_id) {
    whereClause.push(`room_id = :room_id`);
  }

  const query = `
    SELECT rooms.details->'name' AS room_name,
    rooms.room_id,
           reservations.checkin,
           reservations.checkout,
           reservations.res_id,
           reservations.cancelled,
           reservations.user_id,
           users.username
    FROM reservations
    INNER JOIN rooms USING(room_id)
    LEFT JOIN users ON reservations.user_id = users.user_id
    ${whereClause.length > 0 ? `WHERE ${whereClause.join(" AND ")}` : ""};
  `;

  const reservations = await sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: {
      user_id,
      room_id,
    },
  });

  return reservations;
};

const getOne = async (options) => {
  return await Reservation.findOne({ where: options });
};

const deleteOne = async (options) => {
  return await Reservation.destroy({ where: options });
};
const updateOne = async (details, options) => {
  return await Reservation.update(details, { where: options });
};

module.exports = {
  getAll,
  getAllRes,
  getOne,
  deleteOne,
  updateOne,
  addOne,
  getAllDetails,
};
