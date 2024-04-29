const client = require("../../../../config/database/redis");

const addReservationToCache = async ({
  room_id,
  res_id,
  checkin,
  checkout,
  current_res,
}) => {
  await client.hSet(`${room_id}:${res_id}`, [
    "checkin",
    checkin.time,
    "checkout",
    checkout.time,
    "current_res",
    current_res,
  ]);
  await client.APPEND("reservations", `${room_id}:${res_id};`);
};

module.exports = addReservationToCache;
