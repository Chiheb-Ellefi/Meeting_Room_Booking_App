const moment = require("moment");
const client = require("../../../config/database/redis");

const {
  getAll: getAllReservations,
  updateOne: updateReservation,
} = require("../../services/reservation.service");
const addReservationToCache = require("../../custom_modules/reservation/cache/add_reservation");
const setReservationsStringToEmpty = require("../../custom_modules/reservation/cache/set_reservations");
const getReservationsOfToday = async () => {
  //const forced = await client.FLUSHDB();
  setReservationsStringToEmpty();
  const reservations = await getAllReservations({
    valid: true,
  });

  reservations.forEach(async (reservation) => {
    const today = moment().format("YYYY-MM-DD");
    if (today > moment(reservation.checkout.date).format("YYYY-MM-DD")) {
      await updateReservation({ valid: false }, { res_id: reservation.res_id });
    } else {
      await addReservationToCache({
        room_id: reservation.room_id,
        res_id: reservation.res_id,
        checkin: reservation.checkin,
        checkout: reservation.checkout,
        current_res: 0,
      });
    }
  });
};

module.exports = getReservationsOfToday;
