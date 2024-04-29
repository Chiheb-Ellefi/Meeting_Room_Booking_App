const express = require("express");
const authenticationMiddleware = require("../middlewares/authentication");
const checkForAdminMiddleware = require("../middlewares/admin_middleware");
const isBookedMiddleware = require("../middlewares/is_booked_middleware");
const {
  getAllReservations,
  getAllReservationsDetails,
  bookRoom,
  cancelReservation,
  editReservation,
  deleteReservation,
} = require("../controllers/reservation.controller");
const router = express.Router();

router
  .route("/book")
  .post(authenticationMiddleware, isBookedMiddleware, bookRoom);
router
  .route("/reservations")
  .get(authenticationMiddleware, getAllReservationsDetails);
router
  .route("/reservations/all")
  .get(authenticationMiddleware, getAllReservations);
router
  .route("/reservation/cancel/:res_id")
  .patch(authenticationMiddleware, cancelReservation);
router.route("/reservation/:res_id").patch(editReservation);
router
  .route("/reservation/:res_id")
  .delete(authenticationMiddleware, checkForAdminMiddleware, deleteReservation);
module.exports = router;
