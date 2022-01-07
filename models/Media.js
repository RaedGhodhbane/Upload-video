const mongoose = require("mongoose");

// model video

const mediaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    videos: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = Media = mongoose.model("Media", mediaSchema);
