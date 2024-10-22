const mongoose = require("mongoose");

const cooperativeSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: false,
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

module.exports = mongoose.model("cooperative", cooperativeSchema);
