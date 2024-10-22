const express = require("express");
const {
  createNews,
  createNewsItem,
  getNewsDetail,
  getNewsList,
  updateNews,
  deleteNews,
  getNewsItemDetail,
  deleteNewsItem,
  getNewsDetailFull,
  updateNewsItem,
  getAllYear,
} = require("../controllers/newsController");
const {
  verifyAccessToken,
  authorizeRoles,
} = require("../middlewares/jwtHelper");
const { upload } = require("../utils/upload");
const router = express.Router();

router.route("/admin/news/create").post(
  verifyAccessToken,
  authorizeRoles("admin"),
  upload(`news`).fields([
    { name: "viPoster", maxCount: 1 },
    { name: "jpPoster", maxCount: 1 },
  ]),
  createNews
);
router.route("/admin/news/update/:id").post(
  verifyAccessToken,
  authorizeRoles("admin"),
  upload("news").fields([
    { name: "viPoster", maxCount: 1 },
    { name: "jpPoster", maxCount: 1 },
  ]),
  updateNews
);
router
  .route("/admin/news/delete/:id")
  .delete(verifyAccessToken, authorizeRoles("admin"), deleteNews);
router
  .route("/admin/news-item/delete/:newsId/:newsItemId")
  .delete(verifyAccessToken, authorizeRoles("admin"), deleteNewsItem);
router
  .route("/admin/news-item/create/:lang/:id")
  .post(
    upload("news").any(),
    verifyAccessToken,
    authorizeRoles("admin"),
    createNewsItem
  );
router
  .route("/admin/news-item/update/:newsId/:newsItemId")
  .post(
    upload("news").any(),
    verifyAccessToken,
    authorizeRoles("admin"),
    updateNewsItem
  );
router.route("/detail/:id").get(getNewsDetail);
router.route("/detail-full/:id").get(getNewsDetailFull);
router.route("/news-item/detail/:id").get(getNewsItemDetail);
router.route("/").get(getNewsList);
router.route("/year/all").get(getAllYear);

module.exports = router;
