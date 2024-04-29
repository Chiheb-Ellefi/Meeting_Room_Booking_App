const client = require("../../../config/database/redis");
const getReservationFromCache = require("./cache/get_reservation");
const removeReservationFromCache = require("./cache/remove_reservation");
const updateReservationInCache = require("./cache/update_reservation");
const { updateOne: updateRoom } = require("../../services/room.service");
const moment = require("moment");
const checkForReservations = async (roomStatusUpdate) => {
  const reservationsID = await client.GET("reservations");
  if (!reservationsID) {
    return;
  }
  const reservations = reservationsID
    .split(";")
    .forEach(async (reservation) => {
      if (!reservation) {
        return;
      }
      const id = reservation.split(":");
      const { checkin, checkout, current_res } = await getReservationFromCache({
        room_id: id[0],
        res_id: id[1],
      });
      if (
        moment(checkin, "hh:mm").format("HH:mm") <= moment().format("HH:mm")
      ) {
        if (
          moment(checkout, "hh:mm").format("HH:mm") > moment().format("HH:mm")
        ) {
          if (current_res == "0") {
            console.log("current_res == 0");
            await updateRoom(
              { booked: true, res_id: id[1] },
              { room_id: id[0] }
            );
            await updateReservationInCache({
              room_id: id[0],
              res_id: id[1],
              current_res: 1,
            });
            roomStatusUpdate({ roomId: id[0], booked: true, res_id: id[1] });
          } else return;
        } else {
          if (current_res == "1") {
            console.log("current_res ==1");
            await updateRoom(
              { booked: false, res_id: null },
              { room_id: id[0] }
            );
            roomStatusUpdate({ roomId: id[0], booked: false, res_id: null });
            await removeReservationFromCache({ res_id: id[1], room_id: id[0] });
          }
        }
      }
    });
  return;
};

module.exports = { checkForReservations };
