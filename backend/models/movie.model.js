const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    title: String,
    type: {
      type: String,
      enum: ["English", "Hindi", "Tamil", "Jdrama", "Kdrama"],
      required: true,
    },
    status: {
      type: String,
      enum: [
        "watched",
        "watching",
        "will watch",
        "on hold",
        "should watch",
        "dropped",
      ],
      required: true,
    },
    duration: Number,
    genre: [String],
    preview: String,
    content_id: String,
    description: String,
    airingstatus: {
      type: String,
      enum: ["is airing", "will be airing", "airing on hold"],
    },
    releasedat: Number,
  },
  { timestamps: true },
);

const movie = mongoose.model("movie", movieSchema);

module.exports = movie;
