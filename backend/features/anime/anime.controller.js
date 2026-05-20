import {
  fetch_trendings,
  fetch_genre_list,
  fetch_genred,
  fetch_searched,
  fetch_detailed,
  fetch_categories,
} from "./anime.service.js";

export async function trending_fetch_controller(req, res) {
  try {
    const data = await fetch_trendings();
    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    console.log("from api/anime/trending route");

    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
}

export async function genre_list_fetch_controller(req, res) {
  try {
    const data = await fetch_genre_list();

    res.status(200).json({ data });
  } catch (error) {
    console.log(
      `error while fetching data from the anime_genre_list route's jikan api server side : ${error}`,
    );
    res.status(500).json({
      error:
        "Internal Server Error the anime_genre_list route's jikan api failed",
    });
  }
}

export async function genre_anime_fetch_controller(req, res) {
  try {
    const genre_id = req.params.genre_id;
    const page_number = req.params.page_number;

    const { send_data } = await fetch_genred(genre_id, page_number);

    res.json({ send_data });
  } catch (error) {
    console.log(
      `error while fetching data from anime_route_genre server side : ${error}`,
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function search_anime_fetch_controller(req, res) {
  const query = req.params.query;
  const page_number = req.params.page_number;
  try {
    const { send_data } = await fetch_searched(query, page_number);

    res.json({ send_data });
  } catch (error) {
    console.log(
      `error while fetching data from anime_route_search server side : ${error}`,
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function details_anime_fetch_controller(req, res) {
  const anime_id = Number(req.params.anime_id);
  try {
    if (isNaN(anime_id)) {
      return res
        .status(400)
        .json({ error: "Invalid ID format. Must be a number." });
    }

    const data = await fetch_detailed(anime_id);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function category_anime_fetch_controller(req, res) {
  const { category, page } = req.params;

  try {
    const { send_data } = await fetch_categories(page, category);

    res.json({ send_data });
  } catch (error) {
    console.error(`Error fetching ${category}: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
