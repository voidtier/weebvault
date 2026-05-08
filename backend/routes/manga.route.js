const express = require("express");
const router = express.Router();
const authentify = require("../middlewares/authentication.middleware.js");
const { jikan_base_url } = require("../config/api.js");

const categories = {
  top: "",
  popular: "filter=bypopularity",
  favorite: "filter=favorite",
  trending: "filter=publishing",
  manga: "type=manga", // Traditional Japanese
  novel: "type=novel", // Light Novels
  oneshot: "type=oneshot", // Single chapters
  manhua: "type=manhua", // Chinese
  manhwa: "type=manhwa", // Korean
};

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
        const { mal_id, images, type } = gen;
        return {
          mal_id,
          images,
          type,
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
    const page_number = req.params.page_number;
    const type = "manga";
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
      const { mal_id, images, type } = gen;
      return {
        mal_id,
        images,
        type,
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

router.get("/trending", authentify, async function (req, res) {
  try {
    const manga_url = `${jikan_base_url}/top/manga`;
    const response = await fetch(manga_url);
    if (!response.ok) {
      return res
        .status(response.status)
        .json({ message: "External API Error" });
    }
    const { data } = await response.json();
    let data_array = [];

    data_array = data.map((ani) => {
      const {
        mal_id,
        url,
        images,
        titles,
        title,
        title_english,
        title_japanese,
        title_synonyms,
        type,
        chapters,
        volumes,
        status,
        publishing,
        published,
        rating,
        score,
        scored_by,
        rank,
        popularity,
        members,
        favorites,
        synopsis,
        background,
        authors,
        serializations,
        genres,
      } = ani;
      return {
        mal_id,
        url,
        images,
        titles,
        title,
        title_english,
        title_japanese,
        title_synonyms,
        type,
        chapters,
        volumes,
        status,
        publishing,
        published,
        rating,
        score,
        scored_by,
        rank,
        popularity,
        members,
        favorites,
        synopsis,
        background,
        authors,
        serializations,
        genres,
      };
    });

    res.status(response.status).json({
      data_array,
    });
  } catch (error) {
    console.log(
      `error while fetching data from manga_route_treanding server side : ${error}`,
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:manga_id", async function (req, res) {
  try {
    const manga_id = Number(req.params.manga_id);
    if (isNaN(manga_id)) {
      return res
        .status(400)
        .json({ error: "Invalid ID format. Must be a number." });
    }
    const manga_url = `${jikan_base_url}/manga/${manga_id}`;
    const response = await fetch(manga_url);
    const { data } = await response.json();

    const {
      mal_id,
      url,
      images,
      titles,
      title,
      title_english,
      title_japanese,
      title_synonyms,
      type,
      chapters,
      volumes,
      status,
      publishing,
      published,
      rating,
      score,
      scored_by,
      rank,
      popularity,
      members,
      favorites,
      synopsis,
      background,
      authors,
      serializations,
      genres,
    } = data;

    res.status(response.status).json({
      mal_id,
      url,
      images,
      titles,
      title,
      title_english,
      title_japanese,
      title_synonyms,
      type,
      chapters,
      volumes,
      status,
      publishing,
      published,
      rating,
      score,
      scored_by,
      rank,
      popularity,
      members,
      favorites,
      synopsis,
      background,
      authors,
      serializations,
      genres,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("/:category/:page", authentify, async function (req, res) {
  const { category, page } = req.params;
  const filter_category = categories[category];

  if (filter_category === undefined) {
    return res.status(404).json({ message: "Category not found" });
  }

  try {
    const manga_url = `${jikan_base_url}/top/manga?page=${page}${filter_category}`;
    const response = await fetch(manga_url);

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ message: "External API Error" });
    }

    const { data, pagination } = await response.json();

    const send_data = data.map(({ mal_id, images, type }) => ({
      mal_id,
      images,
      type,
    }));

    res.json({
      has_page: pagination.has_next_page || false,
      send_data,
    });
  } catch (error) {
    console.error(`Error fetching ${category}: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
