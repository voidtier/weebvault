import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
// import addRouter from "./routes/add.route.js"
import animeRouter from "./routes/anime.route.js";
// import mangaRouter from "./routes/manga.route.js";
// import movieRouter from "./routes/movie.route.js";
// import tvRouter from "./routes/tv.route.js";
import cors from "cors";

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", userRouter);
// app.use("/api/add", addRouter);
app.use("/api/anime", animeRouter);
// app.use("/api/manga", mangaRouter);
// app.use("/api/movie", movieRouter);
// app.use("/api/tv", tvRouter);

export default app;
