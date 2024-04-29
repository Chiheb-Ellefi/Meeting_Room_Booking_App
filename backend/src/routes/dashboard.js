const router = require("express").Router();
const authenticationMiddleware = require("../middlewares/authentication");
const checkForAdminMiddleware = require("../middlewares/admin_middleware");

const {
  getReservationsPerRoom,
  getReservationsPerUser,
  getMostBookedRooms,
  getUsersWithMostCancels,
} = require("../controllers/dashboard.controller");

router
  .route("/reservations-per-room")
  .get(
    authenticationMiddleware,
    checkForAdminMiddleware,
    getReservationsPerRoom
  );
router
  .route("/reservations-per-user")
  .get(
    authenticationMiddleware,
    checkForAdminMiddleware,
    getReservationsPerUser
  );
router
  .route("/top-rooms")
  .get(authenticationMiddleware, checkForAdminMiddleware, getMostBookedRooms);
router
  .route("/cancels-per-user")
  .get(
    authenticationMiddleware,
    checkForAdminMiddleware,
    getUsersWithMostCancels
  );

module.exports = router;
