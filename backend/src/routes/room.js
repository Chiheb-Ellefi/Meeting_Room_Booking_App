const express = require("express");
const {
  getAllRooms,
  getRoom,
  addRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/room.controller");
const authenticationMiddleware = require("../middlewares/authentication");
const checkForAdminMiddleware = require("../middlewares/admin_middleware");

const router = express.Router();

router.route("/rooms").get(authenticationMiddleware, getAllRooms);
router.route("/room/:room_id").get(authenticationMiddleware, getRoom);
router
  .route("/room")
  .post(authenticationMiddleware, checkForAdminMiddleware, addRoom);
router
  .route("/room/:room_id")
  .patch(authenticationMiddleware, checkForAdminMiddleware, updateRoom);
router
  .route("/room/:room_id")
  .delete(authenticationMiddleware, checkForAdminMiddleware, deleteRoom);
module.exports = router;
