const express = require("express");
const {
  verifyAccessToken,
  authorizeRoles,
} = require("../middlewares/jwtHelper");
const { upload } = require("../utils/upload");
const {
  createFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedbackDetail,
  getFeedbackList,
} = require("../controllers/feedbackController");
const router = express.Router();

router
  .route("/admin/create")
  .post(
    verifyAccessToken,
    authorizeRoles("admin"),
    upload("feedbacks").single("file"),
    createFeedback
  );
router
  .route("/admin/update/:id")
  .post(
    verifyAccessToken,
    authorizeRoles("admin"),
    upload("feedbacks").single("file"),
    updateFeedback
  );
router
  .route("/admin/delete/:id")
  .delete(verifyAccessToken, authorizeRoles("admin"), deleteFeedback);
router.route("/admin/:id").get(getFeedbackDetail);
router.route("/").get(getFeedbackList);

module.exports = router;
