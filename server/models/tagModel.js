const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  visible: {
    type: Boolean,
    default: false,
    required: true,
  },
  vi: {
    type: String,
    required: true,
  },
  jp: {
    type: String,
    required: true,
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

module.exports = mongoose.model("tag", tagSchema);
