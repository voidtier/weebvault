import express from "express";
const router = express.Router();
import authentify from "../middlewares/authentication.middleware.js";
import { tmdb_base_url } from "../config/api.js";

// Mapping categories to TMDB endpoints
const categories = {
  top: "top_rated",
  popular: "popular",
  trending: "now_playing", // Mirroring anime 'airing'
  upcoming: "upcoming",
};

//for movie genre list
router.get("/genre", authentify, async function (req, res) {
  const movie_url = `${tmdb_base_url}/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`;
  try {
    const response = await fetch(movie_url);
    if (!response.ok)
      return res.status(response.status).json({
        message: `External API ${movie_url} Error : the movie_genre_list route's jikan api failed`,
      });

    const { genres } = await response.json();
    const send_data = genres.map((gen) => ({
      genre_name: gen.name,
      genre_id: gen.id,
    }));

    res.json(send_data);
  } catch (error) {
    console.error(
      `error while fetching data from the movie_genre_list route's jikan api server side : ${error}`,
    );
    res.status(500).json({
      error:
        "Internal Server Error the movie_genre_list route's jikan api failed",
    });
  }
});

// 2. Get Movies by Genre
router.get(
  "/genre/:genre_id/:page_number",
  authentify,
  async function (req, res) {
    try {
      const { genre_id, page_number } = req.params;
      const url = `${tmdb_base_url}/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=${genre_id}&page=${page_number}`;

      const response = await fetch(url);
      if (!response.ok)
        return res
          .status(response.status)
          .json({ message: "External API Error" });

      const data = await response.json();
      const send_data = data.results.map((m) => ({
        id: m.id,
        title: m.title,
        poster_path: m.poster_path,
        type: "movie",
        release_date: m.release_date,
      }));

      res.json({ has_page: data.page < data.total_pages, send_data });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

// 3. Search Movies
router.get(
  "/search/:query/:page_number",
  authentify,
  async function (req, res) {
    try {
      const { query, page_number } = req.params;
      const url = `${tmdb_base_url}/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}&page=${page_number}`;

      const response = await fetch(url);
      if (!response.ok)
        return res
          .status(response.status)
          .json({ message: "External API Error" });

      const data = await response.json();
      const send_data = data.results.map((m) => ({
        id: m.id,
        title: m.title,
        poster_path: m.poster_path,
        type: "movie",
      }));

      res.json({ has_page: data.page < data.total_pages, send_data });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

//trending movie
router.get("/trending", authentify, async function (req, res) {
  try {
    const anime_url = `${tmdb_base_url}/movie/top_rated?api_key=${process.env.TMDB_API_KEY}`;

    const response = await fetch(anime_url);
    if (!response.ok) {
      return res
        .status(response.status)
        .json({ message: "External API Error" });
    }
    const { results } = await response.json();
    let data_array = [];

    data_array = results.map((ani) => {
      const {
        id,
        title,
        overview,
        vote_average,
        vote_count,
        backdrop_path,
        poster_path,
        release_date,
        original_language,
      } = ani;
      return {
        id,
        title,
        overview,
        vote_average,
        vote_count,
        backdrop_path,
        poster_path,
        release_date,
        original_language,
      };
    });

    res.status(response.status).json({
      data_array,
    });
  } catch (error) {
    console.log(
      `error while fetching data from anime_route_treanding server side : ${error}`,
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 4. Single Movie Details (Fixed the missing await from your uploaded file)
router.get("/:movie_id", async function (req, res) {
  try {
    const movie_id = Number(req.params.movie_id);
    const url = `${tmdb_base_url}/movie/${movie_id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,credits`;

    const response = await fetch(url);
    if (!response.ok)
      return res.status(404).json({ message: "Movie Not Found" });

    const data = await response.json(); // FIXED: added await
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Category Lists (Mirroring anime.route.js /:category/:page)
router.get("/:category/:page", authentify, async function (req, res) {
  const { category, page } = req.params;

  // If the request matches the details route (is a number), skip this route
  if (!isNaN(category)) return;

  const tmdb_endpoint = categories[category];
  if (!tmdb_endpoint)
    return res.status(404).json({ message: "Category not found" });

  try {
    const url = `${tmdb_base_url}/movie/${tmdb_endpoint}?api_key=${process.env.TMDB_API_KEY}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();

    const send_data = data.results.map((m) => ({
      id: m.id,
      title: m.title,
      poster_path: m.poster_path,
      type: "movie",
    }));

    res.json({ has_page: data.page < data.total_pages, send_data });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;
