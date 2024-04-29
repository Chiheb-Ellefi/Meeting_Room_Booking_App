const client = require("../../../../config/database/redis");

const updateReservationInCache = async ({ room_id, res_id, current_res }) => {
  await client.hSet(`${room_id}:${res_id}`, ["current_res", current_res]);
};

module.exports = updateReservationInCache;
