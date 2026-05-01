const express = require("express");
const router = express.Router();
const authentify = require("../middlewares/authentication.middleware.js");
const { jikan_base_url } = require("../config/api.js");

router.get("/genre", authentify, async function (req, res) {
  const manga_genre_url = `${jikan_base_url}/genres/manga`;
  try {
    const response = await fetch(manga_genre_url);

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ message: "External API Error" });
    }

    const { data } = await response.json();

    const send_data = data.map((gen) => {
      return {
        genre_name: gen.name,
        genre_id: gen.mal_id,
      };
    });

    res.json(send_data);
  } catch (error) {
    console.log(
      `error while fetching data from manga_route_genre_list server side : ${error}`,
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get(
  "/genre/:genre_id/:page_number",
  authentify,
  async function (req, res) {
    try {
      const genre_id = req.params.genre_id;
      const page_number = req.params.page_number;
      const manga_genre_url = `${jikan_base_url}/manga?genres=${genre_id}&page=${page_number}`;
      const response = await fetch(manga_genre_url);

      if (!response.ok) {
        return res
          .status(response.status)
          .json({ message: "External API Error" });
      }

      const { data, pagination } = await response.json();
      const has_page = pagination.has_next_page || false;

      const send_data = data.map((gen) => {
        return {
          title_en: gen.title_en || gen.title.english || gen.title || gen.name,
          type: gen.type,
          status: gen.status,
          images: gen.images,
        };
      });

      res.json({
        has_page,
        send_data,
      });
    } catch (error) {
      console.log(
        `error while fetching data from manga_route_genre server side : ${error}`,
      );
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

router.get("/:query/:page_number", authentify, async function (req, res) {
  try {
    const query = req.params.query;
    const type = "manga";
    const page_number = req.params.page_number;
    const manga_url = `${jikan_base_url}/manga?q=${query}&page=${page_number}`;
    const response = await fetch(manga_url);

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ message: "External API Error" });
    }

    const { data, pagination } = await response.json();
    const has_page = pagination.has_next_page || false;

    const send_data = data.map((gen) => {
      return {
        title_en: gen.title_en || gen.title.english || gen.title || gen.name,
        type: gen.type,
        status: gen.status,
        images: gen.images,
      };
    });

    res.json({
      has_page,
      send_data,
      type,
    });
  } catch (error) {
    console.log(
      `error while fetching data from manga_route_search server side : ${error}`,
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
