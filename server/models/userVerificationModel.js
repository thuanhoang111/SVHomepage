const mongoose = require("mongoose");

const userVerificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "Please enter the user's id need verification."],
  },
  uniqueString: {
    type: String,
    required: [
      true,
      "Please enter the user's unique string that needs verification.",
    ],
  },
  createdAt: {
    type: Date,
    required: [true, "Please select a time user need to verify."],
  },
  expiresAt: {
    type: Date,
    required: [
      true,
      "Please select an expiration time the user needs to verify.",
    ],
  },
  urlRedirect: {
    type: String,
    required: [true, "Please enter the url redirect."],
  },
});

module.exports = mongoose.model("userVerification", userVerificationSchema);
