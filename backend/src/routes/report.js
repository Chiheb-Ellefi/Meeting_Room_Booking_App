const {
  addReport,
  getAllReports,
  deleteReport,
  updateReport,
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
router
  .route("/report/:rep_id")
  .patch(authenticationMiddleware, checkForAdminMiddleware, updateReport);
module.exports = router;
