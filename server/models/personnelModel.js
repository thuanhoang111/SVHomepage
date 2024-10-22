const mongoose = require("mongoose");

const personnelSchema = new mongoose.Schema({
  visible: {
    type: Boolean,
    default: false,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  vi: {
    department: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    possition: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  jp: {
    department: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    possition: {
      type: String,
      required: true,
    },
    name: {
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

module.exports = mongoose.model("personnel", personnelSchema);
