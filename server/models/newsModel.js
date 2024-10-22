const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
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
    title: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    news: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "newsItem",
          requried: true,
        },
      },
    ],
  },
  jp: {
    title: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    news: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "newsItem",
          requried: true,
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

module.exports = mongoose.model("news", newsSchema);
