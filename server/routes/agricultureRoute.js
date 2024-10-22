const express = require("express");
const {
  verifyAccessToken,
  authorizeRoles,
} = require("../middlewares/jwtHelper");
const { upload } = require("../utils/upload");
const {
  createAgriculture,
  updateAgriculture,
  deleteAgriculture,
  createAgricultureItem,
  updateAgricultureItem,
  getAgricultureDetail,
  getAgricultureDetailFull,
  getAgricultureItemDetail,
  getAgricultureList,
  deleteAgricultureItem,
  createTag,
  updateTag,
  deleteTag,
  getTagList,
  getTagDetail,
} = require("../controllers/agricultureController");
const router = express.Router();

router.route("/admin/agriculture/create").post(
  verifyAccessToken,
  authorizeRoles("admin"),
  upload("agricultures").fields([
    { name: "viPoster", maxCount: 1 },
    { name: "jpPoster", maxCount: 1 },
  ]),
  createAgriculture
);
router.route("/admin/agriculture/update/:id").post(
  verifyAccessToken,
  authorizeRoles("admin"),
  upload("agricultures").fields([
    { name: "viPoster", maxCount: 1 },
    { name: "jpPoster", maxCount: 1 },
  ]),
  updateAgriculture
);
router
  .route("/admin/agriculture/delete/:id")
  .delete(verifyAccessToken, authorizeRoles("admin"), deleteAgriculture);
router.route("/admin/agriculture-item/create/:lang/:id").post(
  verifyAccessToken,
  authorizeRoles("admin"),
  upload("agricultures").fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  createAgricultureItem
);
router
  .route("/admin/agriculture-item/update/:agricultureId/:agricultureItemId")
  .post(
    verifyAccessToken,
    authorizeRoles("admin"),
    upload("agricultures").fields([
      { name: "image", maxCount: 1 },
      { name: "video", maxCount: 1 },
      { name: "pdf", maxCount: 1 },
    ]),
    updateAgricultureItem
  );
router
  .route("/admin/agriculture-item/delete/:agricultureId/:agricultureItemId")
  .delete(verifyAccessToken, authorizeRoles("admin"), deleteAgricultureItem);
router.route("/detail/:id").get(getAgricultureDetail);
router.route("/detail-full/:id").get(getAgricultureDetailFull);
router.route("/agriculture-item/detail/:id").get(getAgricultureItemDetail);
router.route("/").get(getAgricultureList);
router.route("/:lang").get(getAgricultureList);
router.route("/:lang/:tag").get(getAgricultureList);
router
  .route("/admin/tag/create")
  .post(verifyAccessToken, authorizeRoles("admin"), createTag);
router
  .route("/admin/tag/update/:id")
  .post(verifyAccessToken, authorizeRoles("admin"), updateTag);
router
  .route("/admin/tag/delete/:id")
  .delete(verifyAccessToken, authorizeRoles("admin"), deleteTag);
router.route("/tag/full/all").get(getTagList);
router.route("/tag/detail/:id").get(getTagDetail);

module.exports = router;
