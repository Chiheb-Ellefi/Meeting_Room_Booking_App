const {
  deleteUser,
  getAllUsers,
  editUser,
  toggleUser,
} = require("../controllers/user.controller");
const router = require("express").Router();
const authenticationMiddleware = require("../middlewares/authentication");
const checkForAdminMiddleware = require("../middlewares/admin_middleware");

router
  .route("/users")
  .get(authenticationMiddleware, checkForAdminMiddleware, getAllUsers);
router
  .route("/user/toggle")
  .patch(authenticationMiddleware, checkForAdminMiddleware, toggleUser);
router.route("/user/:user_id").patch(authenticationMiddleware, editUser);
router
  .route("/user/:user_id")
  .delete(authenticationMiddleware, checkForAdminMiddleware, deleteUser);

module.exports = router;
