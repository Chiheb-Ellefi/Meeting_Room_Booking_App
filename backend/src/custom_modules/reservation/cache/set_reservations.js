const client = require("../../../../config/database/redis");

const setReservationsStringToEmpty = async () => {
  await client.SET("reservations", ``);
};

module.exports = setReservationsStringToEmpty;
