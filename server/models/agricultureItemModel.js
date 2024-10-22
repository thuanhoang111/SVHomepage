const mongoose = require("mongoose");

const agricultureItemSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  topContent: {
    type: String,
  },
  italicContent: {
    type: String,
  },
  image: {
    type: String,
  },
  video: {
    type: String,
  },
  pdf: {
    type: String,
  },
  youtube: {
    type: String,
  },
  bottomContent: {
    type: String,
  },
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

module.exports = mongoose.model("agricultureItem", agricultureItemSchema);
