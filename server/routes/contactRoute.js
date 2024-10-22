const express = require("express");
const {
  createContact,
  updateContact,
  deleteContact,
  getContactList,
  getContactDetail,
} = require("../controllers/contactController");
const router = express.Router();
const {
  verifyAccessToken,
  authorizeRoles,
} = require("../middlewares/jwtHelper");

router
  .route("/admin/create")
  .post(verifyAccessToken, authorizeRoles("admin"), createContact);
router
  .route("/admin/update/:id")
  .post(verifyAccessToken, authorizeRoles("admin"), updateContact);
router
  .route("/admin/delete/:id")
  .delete(verifyAccessToken, authorizeRoles("admin"), deleteContact);
router.route("/").get(getContactList);
router.route("/admin/:id").get(getContactDetail);

module.exports = router;
