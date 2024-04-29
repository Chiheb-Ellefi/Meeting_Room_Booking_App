const {
  addReport,
  getAllReports,
  deleteReport,
} = require("../controllers/report.controller");
const authenticationMiddleware = require("../middlewares/authentication");
const checkForAdminMiddleware = require("../middlewares/admin_middleware");
const router = require("express").Router();

router.route("/report").post(authenticationMiddleware, addReport);
router
  .route("/report/:rep_id")
  .delete(authenticationMiddleware, checkForAdminMiddleware, deleteReport);
router
  .route("/reports")
  .get(authenticationMiddleware, checkForAdminMiddleware, getAllReports);

module.exports = router;
