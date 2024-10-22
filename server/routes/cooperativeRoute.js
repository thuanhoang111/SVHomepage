const express = require("express");
const {
  createCooperative,
  getCooperativeList,
  deleteCooperative,
  updateCooperative,
} = require("../controllers/cooperativeController");
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
    upload("cooperatives").single("file"),
    createCooperative
  );
router.route("/").get(getCooperativeList);
router
  .route("/admin/delete/:id")
  .delete(verifyAccessToken, authorizeRoles("admin"), deleteCooperative);
router
  .route("/admin/update/:id")
  .post(
    verifyAccessToken,
    authorizeRoles("admin"),
    upload("cooperatives").single("file"),
    updateCooperative
  );

module.exports = router;
