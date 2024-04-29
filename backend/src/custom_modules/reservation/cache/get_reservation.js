const client = require("../../../../config/database/redis");

const getReservationFromCache = async ({ room_id, res_id }) => {
  return await client.hGetAll(`${room_id}:${res_id}`);
};
module.exports = getReservationFromCache;
