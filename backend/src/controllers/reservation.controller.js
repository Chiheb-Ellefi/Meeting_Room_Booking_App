const { StatusCodes } = require("http-status-codes");
const { sequelize } = require("../../config/database/database");

const axios = require("axios");
const formatTime = require("../utils/format_time");
const {
  deleteOne,
  updateOne,
  addOne,
  getAllDetails,
  getAllRes,
} = require("../services/reservation.service");
const { updateOne: updateRoom } = require("../services/room.service");
const {
  BadRequest,
  Unauthenticated,
  FailedDependency,
} = require("../../config/errors");
const addReservationToCache = require("../custom_modules/reservation/cache/add_reservation");
const getReservationFromCache = require("../custom_modules/reservation/cache/get_reservation");
const removeReservationFromCache = require("../custom_modules/reservation/cache/remove_reservation");
const moment = require("moment");
const { findUser } = require("../services/user.service");

const bookRoom = async (req, res) => {
  let { room_id, user_id, checkin, checkout } = req.body;
  const user = await findUser({ user_id });
  if (!user.active) {
    throw new Unauthenticated("You are not authorized to book a room.");
  }
  if (!(room_id && user_id && checkin && checkout)) {
    throw new BadRequest("Provide the needed details ");
  } //formatting the checkin and checkout objects
  checkin = formatTime(checkin);
  checkout = formatTime(checkout);

  if (checkout.date < moment().format("YYYY-MM-DD")) {
    throw new BadRequest("The checkout date has already passed");
  }
  const reservation = await addOne({ room_id, user_id, checkin, checkout });
  if (!reservation) {
    throw new FailedDependency("Storing Reservation in database failed.");
  }
  if (
    checkout.date >= moment().format("YYYY-MM-DD") &&
    checkout.time > moment().format("HH:mm")
  ) {
    await addReservationToCache({
      room_id: reservation.room_id,
      res_id: reservation.res_id,
      checkin: reservation.checkin,
      checkout: reservation.checkout,
      current_res: 0,
    });
  }

  res.status(StatusCodes.CREATED).json({ reservation });
};

const getAllReservations = async (req, res) => {
  const { reservations, nbrRes } = await getAllRes(req.query);
  res.status(StatusCodes.OK).json({ reservations, nbrRes: nbrRes[0] });
};
const getAllReservationsDetails = async (req, res) => {
  const { user_id, room_id } = req.query;
  const reservations = await getAllDetails({ user_id, room_id });
  res.status(StatusCodes.OK).json({ reservations });
};

const cancelReservation = async (req, res) => {
  const { room_id, user_id } = req.body;
  const res_id = req.params.res_id;

  if (!room_id || !res_id || !user_id) {
    throw new BadRequest("Provide a room_id and res_id");
  }
  const reservation = await updateOne(
    { valid: false, cancelled: user_id },
    { res_id }
  );
  if (!reservation) {
    throw new FailedDependency("Request to update reservation failed.");
  }
  await updateRoom({ booked: false, res_id: null }, { room_id });
  let checkin = formatTime({ time: new Date(), date: new Date() });
  let checkout = formatTime({
    time: new Date(new Date().getTime() + 60000),
    date: new Date(),
  });

  await addReservationToCache({
    room_id,
    res_id,
    checkin,
    checkout,
    current_res: 0,
  });

  res
    .status(StatusCodes.ACCEPTED)
    .json({ Message: `Reservation with id ${res_id} cancelled successfully!` });
};

const editReservation = async (req, res) => {
  const res_id = req.params.res_id;
  let { checkin, checkout, room_id } = req.body;
  if (!(res_id && checkin && checkout && room_id)) {
    throw new BadRequest("Provide the res_id and checkin and ckeckout.");
  }
  checkin = formatTime(checkin);
  checkout = formatTime(checkout);
  const isUpdated = await updateOne({ checkin, checkout }, { res_id });
  if (!isUpdated) {
    throw new FailedDependency("Request to update reservation failed.");
  }
  await addReservationToCache({
    room_id,
    res_id,
    checkin,
    checkout,
    current_res: 0,
  });
  res.status(StatusCodes.ACCEPTED).json({
    message: `Reservation with id ${res_id} was updated successfully. `,
  });
};
const deleteReservation = async (req, res) => {
  const res_id = req.params.res_id;
  const { room_id, checkin, checkout } = req.body;
  const isDeleted = await deleteOne({ res_id });
  if (!isDeleted) {
    throw new FailedDependency("Request to delete reservation failed.");
  }
  await removeReservationFromCache({ room_id, res_id });
  res.status(StatusCodes.ACCEPTED).json({
    message: `Reservation with id:${res_id} has been deleted successfully.`,
  });
};

module.exports = {
  getAllReservations,
  bookRoom,
  cancelReservation,
  editReservation,
  deleteReservation,
  getAllReservationsDetails,
};
