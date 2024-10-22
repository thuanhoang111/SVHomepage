const mongoose = require("mongoose");

const yearSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  totalNews: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("year", yearSchema);
