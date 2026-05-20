import { jikan_base_url } from "../../config/api.js";
const entity = "anime";
const categories = {
  top: "",
  popular: "filter=bypopularity",
  favorite: "filter=favorite",
  trending: "filter=airing",
  tv: "type=tv",
  movie: "type=movie",
  special: "type=special",
  ona: "type=ona",
  music: "type=music",
  ova: "type=ova",
};

export async function fetch_trendings() {
  try {
    const response = await fetch(`${jikan_base_url}/top/anime`);
    if (!response.ok) {
      throw new Error("fetch failed");
    }
    const { data } = await response.json();
    return data.map((ani) => {
      const {
        mal_id,
        url,
        images,
        trailer,
        titles,
        title,
        title_english,
        title_japanese,
        title_synonyms,
        type,
        source,
        episodes,
        status,
        airing,
        aired,
        duration,
        rating,
        score,
        scored_by,
        rank,
        popularity,
        members,
        favorites,
        synopsis,
        background,
        season,
        year,
        broadcast,
        producers,
        licensors,
        studios,
        genres,
      } = ani;
      return {
        mal_id,
        url,
        images,
        trailer,
        titles,
        title,
        title_english,
        title_japanese,
        title_synonyms,
        type,
        source,
        episodes,
        status,
        airing,
        aired,
        duration,
        rating,
        score,
        scored_by,
        rank,
        popularity,
        members,
        favorites,
        synopsis,
        background,
        season,
        year,
        broadcast,
        producers,
        licensors,
        studios,
        genres,
        entity: entity,
      };
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetch_genre_list() {
  try {
    const response = await fetch(`${jikan_base_url}/genres/anime`);
    if (!response.ok) {
      throw new Error("fetch failed");
    }
    const { data } = await response.json();

    return data.map((gen) => {
      return {
        genre_name: gen.name,
        genre_id: gen.mal_id,
        genre_entity: entity,
      };
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetch_genred(genre_id, page_number) {
  try {
    const response = await fetch(
      `${jikan_base_url}/anime?genres=${genre_id}&page=${page_number}`,
    );

    if (!response.ok) {
      throw new Error("fetch failed");
    }

    const { data, pagination } = await response.json();
    const has_page = pagination.has_next_page || false;

    const send_data = data.map((gen) => {
      const { mal_id, images, type } = gen;
      return {
        mal_id,
        images,
        type,
        entity: entity,
      };
    });

    return { has_page, send_data };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetch_searched(query, page_number) {
  try {
    const response = await fetch(
      `${jikan_base_url}/anime?q=${query}&page=${page_number}`,
    );

    if (!response.ok) {
      throw new Error("fetch failed");
    }

    const { data, pagination } = await response.json();
    const has_page = pagination.has_next_page || false;

    const send_data = data.map((gen) => {
      const { mal_id, images, type } = gen;
      return {
        mal_id,
        images,
        type,
        entity: entity,
      };
    });

    return { has_page, send_data };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetch_detailed(anime_id) {
  try {
    const response = await fetch(`${jikan_base_url}/anime/${anime_id}`);
    if (!response.ok) {
      throw new Error("fetch failed");
    }
    const data = response.json();

    const {
      mal_id,
      url,
      images,
      trailer,
      titles,
      title,
      title_english,
      title_japanese,
      title_synonyms,
      type,
      source,
      episodes,
      status,
      airing,
      aired,
      duration,
      rating,
      score,
      scored_by,
      rank,
      popularity,
      members,
      favorites,
      synopsis,
      background,
      season,
      year,
      broadcast,
      producers,
      licensors,
      studios,
      genres,
      entity,
    } = data;

    return {
      mal_id,
      url,
      images,
      trailer,
      titles,
      title,
      title_english,
      title_japanese,
      title_synonyms,
      type,
      source,
      episodes,
      status,
      airing,
      aired,
      duration,
      rating,
      score,
      scored_by,
      rank,
      popularity,
      members,
      favorites,
      synopsis,
      background,
      season,
      year,
      broadcast,
      producers,
      licensors,
      studios,
      genres,
      entity: entity,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetch_categories(page_number, category) {
  try {
    const filter_category = categories[category];

    if (filter_category === undefined) {
      throw new Error({ message: "Category not found" });
    }

    const response = await fetch(
      `${jikan_base_url}/top/anime?page=${page_number}&${filter_category}`,
    );

    if (!response.ok) {
      throw new Error({ message: "fetch failed" });
    }

    const { data, pagination } = await response.json();
    const has_page = pagination.has_next_page || false;

    const send_data = data.map(({ mal_id, images, type }) => ({
      mal_id,
      images,
      type,
      entity: entity,
    }));

    return { has_page, send_data };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
