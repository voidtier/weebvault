import express from "express";
const router = express.Router();
// import authentify from "../middlewares/authentication.middleware.js";
import {
  trending_fetch_controller,
  genre_list_fetch_controller,
  genre_anime_fetch_controller,
  search_anime_fetch_controller,
  details_anime_fetch_controller,
  category_anime_fetch_controller,
} from "./anime.controller.js";

router.get("/genre", genre_list_fetch_controller);
router.get("/genre/:genre_id/:page_number", genre_anime_fetch_controller);
router.get("/trending", trending_fetch_controller);
router.get("/search/:query/:page_number", search_anime_fetch_controller);
router.get("/details/:anime_id", details_anime_fetch_controller);
router.get("/category/:category/:page", category_anime_fetch_controller);

export default router;
