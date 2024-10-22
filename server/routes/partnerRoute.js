const express = require("express");
const {
  createPartner,
  getPartnerList,
  deletePartner,
  updatePartner,
} = require("../controllers/partnerController");
const router = express.Router();
const {
  verifyAccessToken,
  authorizeRoles,
} = require("../middlewares/jwtHelper");
const { upload } = require("../utils/upload");

router
  .route("/admin/create")
  .post(
    verifyAccessToken,
    authorizeRoles("admin"),
    upload("partners").single("file"),
    createPartner
  );
router.route("/").get(getPartnerList);
router
  .route("/admin/delete/:id")
  .delete(verifyAccessToken, authorizeRoles("admin"), deletePartner);
router
  .route("/admin/update/:id")
  .post(
    verifyAccessToken,
    authorizeRoles("admin"),
    upload("partners").single("file"),
    updatePartner
  );

module.exports = router;
