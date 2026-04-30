const express = require("express");
const router = express.Router();
const path = require("path");
const authentify = require("../middlewares/authentication.middleware.js");

const sectionPath = path.join(__dirname, "../../frontend");

router.get("/sections/:name", authentify, async function (req, res) {
  try {
    const name = req.params.name;
    const allowedSections = [
      "home",
      "add",
      "anime",
      "manga",
      "movies",
      "tv",
    ];
    if (!allowedSections.includes(name)) {
      return res.status(404).send("Section not found");
    }

    res.sendFile(`sections/${name}/${name}.html`, { root: sectionPath });
  } catch (error) {
    console.log(`error while doing the section swtiching :${error}`);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
