const express = require("express");
const router = express.Router();
const authentify = require("../middlewares/authentication.middleware.js");
const { tmdb_base_url } = require("../config/api.js");

router.get("/genre", authentify, async function (req, res) {

  const movies_genre_url = `${tmdb_base_url}/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`
  try {

    const response = await fetch(movies_genre_url);

    if (!response.ok) {
      return res.status(response.status).json({ message: "External API Error" });
    }

    const {genres} = await response.json();

    const send_data = genres.map((gen) => {
      return {
        genre_name: gen.name,
        genre_id: gen.id
      };
    })

    res.json(send_data);


  } catch (error) {
    console.log(`error while fetching data from movies_route_genre_list server side : ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
})


router.get("/genre/:genre_id/:page_number", authentify, async function (req, res) {
  try {
    const genre_id = req.params.genre_id;
    const page_number = req.params.page_number;
    const movies_genre_url = `${tmdb_base_url}/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=${genre_id}&page=${page_number}`
    const response = await fetch(movies_genre_url);

    if (!response.ok) {
      return res.status(response.status).json({ message: "External API Error" });
    }

    const data = await response.json();
    const has_page = data.page < data.total_pages;

    const send_data = data.results.map((gen) => {
      return {
        title_en: gen.title,
        type: "movie",
        release_date: gen.release_date,
        poster_path: gen.poster_path
      };
    })

    res.json({
      has_page, send_data
    });


  } catch (error) {
    console.log(`error while fetching data from movies_route_genre server side : ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
})


router.get("/:query/:page_number", authentify, async function (req, res) {

  try {
    const query = req.params.query;
    const type = "movies";
    const page_number = req.params.page_number;
    const movies_url = `${tmdb_base_url}/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}&page=${page_number}`
    const response = await fetch(movies_url);

    if (!response.ok) {
      return res.status(response.status).json({ message: "External API Error" });
    }

    const data = await response.json();
    const has_page = data.page < data.total_pages || false;

    const send_data = data.results.map((gen) => {
      return {
        title_en: gen.title,
        type: "movie",
        release_date: gen.release_date,
        poster_path: gen.poster_path
      };
    })

    res.json({
      has_page, send_data, type
    });


  } catch (error) {
    console.log(`error while fetching data from movie_route_search server side : ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
})



module.exports = router;