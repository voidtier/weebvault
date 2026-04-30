const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.route.js");
const sectionsRouter = require("./routes/sections.route.js");
// const addRouter = require("./routes/add.route.js");
const animeRouter = require("./routes/anime.route.js");
const mangaRouter = require("./routes/manga.route.js");
const moviesRouter = require("./routes/movies.route.js");
const tvRouter = require("./routes/tv.route.js");
const path = require("path");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", userRouter);
app.use("/api", sectionsRouter);
// app.use("/api/add", addRouter);
app.use("/api/anime", animeRouter);
app.use("/api/manga", mangaRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/tv", tvRouter);
app.use(express.static(path.join(__dirname, "../frontend")));

module.exports = app;
