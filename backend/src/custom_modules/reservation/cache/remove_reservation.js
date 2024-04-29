const client = require("../../../../config/database/redis");

const removeReservationFromCache = async ({ room_id, res_id }) => {
  return await client.HDEL(`${room_id}:${res_id}`, [
    "checkin",
    "checkout",
    "current_res",
  ]);
};

module.exports = removeReservationFromCache;
