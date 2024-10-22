const mongoose = require("mongoose");

const newsItemSchema = new mongoose.Schema({
  imageCenter: {
    type: String,
  },
  imageLeft: {
    type: String,
  },
  imageRight: {
    type: String,
  },
  imageGroup: [
    {
      url: {
        type: String,
      },
    },
  ],
  contentCenter: {
    type: String,
  },
  content: {
    type: String,
  },
  youtube: {
    type: String,
  },
  video: {
    type: String,
  },
  pdf: {
    type: String,
  },
  table: [
    {
      title: {
        type: String,
      },
      content: {
        type: String,
      },
    },
  ],
  linkGroup: [
    {
      content: {
        type: String,
      },
      title: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("newsItem", newsItemSchema);
