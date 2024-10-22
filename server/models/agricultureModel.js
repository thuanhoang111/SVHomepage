const mongoose = require("mongoose");

const agricultureSchema = new mongoose.Schema({
  visible: {
    type: Boolean,
    default: false,
    required: true,
  },
  day: {
    type: Date,
    required: true,
  },
  vi: {
    poster: {
      type: String,
      required: true,
    },
    tag: {
      type: [String],
    },
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    agriculture: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "agricultureItem",
          required: true,
        },
      },
    ],
  },
  jp: {
    poster: {
      type: String,
      required: true,
    },
    tag: {
      type: [String],
    },
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    agriculture: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "agricultureItem",
          required: true,
        },
      },
    ],
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

module.exports = mongoose.model("agriculture", agricultureSchema);
