const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  avatar: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: false,
    required: true,
  },
  vi: {
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  jp: {
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("feedback", feedbackSchema);
