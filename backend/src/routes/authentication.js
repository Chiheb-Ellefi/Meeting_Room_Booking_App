const express = require("express");

const getToken = require("../custom_modules/authentication/token");
const {
  registerUser,
  loginUser,
  forgotPassword,
  logoutUser,
} = require("../controllers/authentication.controller");
const sendEmail = require("../controllers/email.controller");
const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/token").post(getToken);
router.route("/email").post(sendEmail);
router.route("/forgotPassword").patch(forgotPassword);
router.route("/logout").delete(logoutUser);

module.exports = router;
