const express = require("express");
const router = express.Router();
const authentify = require("../middlewares/authentication.middleware.js");
const { tmdb_base_url } = require("../config/api.js");

// 1. Mapping categories to TMDB TV endpoints (Consistent with movie route)
const categories = {
  top: "top_rated",
  popular: "popular",
  trending: "airing_today", // Mirroring anime 'airing' / movie 'now_playing'
  upcoming: "on_the_air",
};

// 2. Get TV Genre List
router.get("/genre", authentify, async function (req, res) {
  const url = `${tmdb_base_url}/genre/tv/list?api_key=${process.env.TMDB_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok)
      return res
        .status(response.status)
        .json({ message: "External API Error" });

    const { genres } = await response.json();
    const send_data = genres.map((gen) => ({
      genre_name: gen.name,
      genre_id: gen.id,
    }));

    res.json(send_data);
  } catch (error) {
    console.error(`Error in tv_genre_list: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 3. Get TV Shows by Genre
router.get(
  "/genre/:genre_id/:page_number",
  authentify,
  async function (req, res) {
    try {
      const { genre_id, page_number } = req.params;
      const url = `${tmdb_base_url}/discover/tv?api_key=${process.env.TMDB_API_KEY}&with_genres=${genre_id}&page=${page_number}`;

      const response = await fetch(url);
      if (!response.ok)
        return res
          .status(response.status)
          .json({ message: "External API Error" });

      const data = await response.json();
      const send_data = data.results.map((tv) => ({
        id: tv.id,
        title: tv.name, // TMDB TV uses 'name'
        poster_path: tv.poster_path,
        type: "tv",
        release_date: tv.first_air_date, // TMDB TV uses 'first_air_date'
      }));

      res.json({ has_page: data.page < data.total_pages, send_data });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

// 4. Search TV Shows
router.get(
  "/search/:query/:page_number",
  authentify,
  async function (req, res) {
    try {
      const { query, page_number } = req.params;
      const url = `${tmdb_base_url}/search/tv?api_key=${process.env.TMDB_API_KEY}&query=${query}&page=${page_number}`;

      const response = await fetch(url);
      if (!response.ok)
        return res
          .status(response.status)
          .json({ message: "External API Error" });

      const data = await response.json();
      const send_data = data.results.map((tv) => ({
        id: tv.id,
        title: tv.name,
        poster_path: tv.poster_path,
        type: "tv",
      }));

      res.json({ has_page: data.page < data.total_pages, send_data });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

// 5. Trending TV (Consistent with movie 'trending' route)
router.get("/trending", authentify, async function (req, res) {
  try {
    const url = `${tmdb_base_url}/tv/top_rated?api_key=${process.env.TMDB_API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      return res
        .status(response.status)
        .json({ message: "External API Error" });
    }
    const { results } = await response.json();

    const data_array = results.map((tv) => {
      const {
        id,
        name, // TV uses 'name'
        overview,
        vote_average,
        vote_count,
        backdrop_path,
        poster_path,
        first_air_date, // TV uses 'first_air_date'
        original_language,
      } = tv;
      return {
        id,
        title: name,
        overview,
        vote_average,
        vote_count,
        backdrop_path,
        poster_path,
        release_date: first_air_date,
        original_language,
      };
    });

    res.status(response.status).json({ data_array });
  } catch (error) {
    console.log(`Error fetching trending TV: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 6. Single TV Show Details
router.get("/:tv_id", async function (req, res) {
  try {
    const tv_id = Number(req.params.tv_id);
    const url = `${tmdb_base_url}/tv/${tv_id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,cre
 dits`;

    const response = await fetch(url);
    if (!response.ok)
      return res.status(404).json({ message: "TV Show Not Found" });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7. Category Lists (Mirroring movie route structure)
router.get("/:category/:page", authentify, async function (req, res) {
  const { category, page } = req.params;

  // If the request matches the details route (is a number), skip this route
  if (!isNaN(category)) return;

  const tmdb_endpoint = categories[category];
  if (!tmdb_endpoint)
    return res.status(404).json({ message: "Category not found" });

  try {
    const url = `${tmdb_base_url}/tv/${tmdb_endpoint}?api_key=${process.env.TMDB_API_KEY}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();

    const send_data = data.results.map((tv) => ({
      id: tv.id,
      title: tv.name,
      poster_path: tv.poster_path,
      type: "tv",
    }));

    res.json({ has_page: data.page < data.total_pages, send_data });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
