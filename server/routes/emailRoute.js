const express = require("express");
const {
  recruitEmail,
  contactEmail,
} = require("../controllers/emailController");
const { upload } = require("../utils/upload");
const router = express.Router();

router.route("/recruit").post(upload("recruits").single("file"), recruitEmail);
router.route("/contact").post(contactEmail);

module.exports = router;
