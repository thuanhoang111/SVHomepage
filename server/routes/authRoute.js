const express = require("express");
const router = express.Router();

const {
  register,
  verifyEmail,
  verified,
  login,
  refreshToken,
  logout,
  requestPasswordReset,
  resetPassword,
  getProfile,
  getUserList,
  updateUser,
  deleteUser,
} = require("../controllers/authController");
const {
  verifyAccessToken,
  authorizeRoles,
} = require("../middlewares/jwtHelper");

router.route("/register").post(register);
router.route("/verify/:userId/:uniqueString").get(verifyEmail);
router.route("/verified").post(verified);
router.route("/login").post(login);
router.route("/refresh-token").post(refreshToken);
router.route("/logout/:refreshToken").delete(logout);
router.route("/requestPasswordReset").post(requestPasswordReset);
router.route("/resetPassword").post(resetPassword);
router.route("/me").get(verifyAccessToken, getProfile);
router.route("/").get(verifyAccessToken, authorizeRoles("admin"), getUserList);
router
  .route("/update/:id")
  .post(verifyAccessToken, authorizeRoles("admin"), updateUser);
router
  .route("/delete/:id")
  .delete(verifyAccessToken, authorizeRoles("admin"), deleteUser);

module.exports = router;
