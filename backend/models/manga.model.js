const mongoose = require("mongoose");

const mangaSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    title: String,
    status: {
      type: String,
      enum: [
        "read",
        "reading",
        "will read",
        "on hold",
        "should read",
        "dropped",
      ],
      required: true,
    },
    totalchapter: Number,
    genre: [String],
    preview: String,
    content_id: String,
    description: String,
    publishstatus: {
      type: String,
      enum: ["is published", "will be published", "publishing on hold"],
    },
    releasedat: Number,
    finishedat: Number,
  },
  { timestamps: true },
);

const manga = mongoose.model("manga", mangaSchema);

module.exports = manga;
