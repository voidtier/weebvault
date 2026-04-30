const mongoose = require("mongoose");

const animeSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    title: String,
    type: {
      type: String,
      enum: ["animeseries", "animemovie"],
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
    totalepisodes: Number,
    genre: [String],
    preview: String,
    content_id: String,
    description: String,
    airingstatus: {
      type: String,
      enum: ["is airing", "will be airing", "airing on hold"],
    },
    releasedat: Number,
    finishedat: Number,
  },
  { timestamps: true },
);

const anime = mongoose.model("anime", animeSchema);

module.exports = anime;
