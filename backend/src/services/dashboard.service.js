const Reservation = require("../models/reservation.model");
const { sequelize } = require("../../config/database/database");
const { QueryTypes } = require("sequelize");
const getReservationsPerRoomService = async () => {
  const query = `
   SELECT rooms.details->>'name' AS name, valid, count(reservations.res_id)::INT FROM reservations INNER JOIN rooms USING(room_id) GROUP BY valid, rooms.details->>'name';
  `;

  const data = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
  return data;
};
const getReservationsPerUserService = async () => {
  const query = `
   SELECT users.username as username, valid, count(reservations.res_id)::INT ,cancelled FROM reservations INNER JOIN users USING(user_id) GROUP BY valid, users.username,cancelled;
  `;
  const data = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
  return data;
};
const getMostBookedRoomsService = async () => {
  const query = `
   SELECT rooms.details->>'name' AS name,  count(reservations.res_id)::INT as value FROM reservations INNER JOIN rooms USING(room_id) WHERE valid = true GROUP BY  rooms.details->>'name' ORDER BY value DESC limit 10;
  `;
  const data = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
  return data;
};
const getUsersWithMostCancelsService = async () => {
  const query =
    "select users.username as name ,count(res_id)::INT as value from reservations inner join users on users.user_id = CAST(reservations.cancelled AS int)  where valid=false and cancelled is not null  group by cancelled,username ;";
  const data = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
  return data;
};

module.exports = {
  getReservationsPerRoomService,
  getReservationsPerUserService,
  getMostBookedRoomsService,
  getUsersWithMostCancelsService,
};
