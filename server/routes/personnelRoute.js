const express = require("express");
const {
  verifyAccessToken,
  authorizeRoles,
} = require("../middlewares/jwtHelper");
const { upload } = require("../utils/upload");
const {
  createPersonnel,
  updatePersonnel,
  deletePersonnel,
  getPersonnelDetail,
  getPersonnelList,
} = require("../controllers/personnelController");
const router = express.Router();

router
  .route("/admin/create")
  .post(
    verifyAccessToken,
    authorizeRoles("admin"),
    upload("personnels").single("file"),
    createPersonnel
  );
router
  .route("/admin/update/:id")
  .post(
    verifyAccessToken,
    authorizeRoles("admin"),
    upload("personnels").single("file"),
    updatePersonnel
  );
router
  .route("/admin/delete/:id")
  .delete(verifyAccessToken, authorizeRoles("admin"), deletePersonnel);
router.route("/admin/:id").get(getPersonnelDetail);
router.route("/").get(getPersonnelList);

module.exports = router;
