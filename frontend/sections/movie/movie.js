function movie_js() {
  strongest_movie_fetch();
  // fetch_movie_genre();

  async function strongest_movie_fetch() {
    const strongest_movie_image = document.querySelector(
      ".strongest_movie_image",
    );
    const rank = document.querySelector(
      ".strongest_movie_details .rank_wrapper .rank",
    );

    const title = document.querySelector(
      ".strongest_movie_details .title_wrapper .title",
    );
    const status = document.querySelector(
      ".strongest_movie_details .status_wrapper .status",
    );
    const description = document.querySelector(
      ".strongest_movie_details .description_wrapper .description",
    );
    const score = document.querySelector(
      ".strongest_movie_details .strongest_movie_stats .score_wrapper .score",
    );
    const ep_or_du = document.querySelector(
      ".strongest_movie_details .strongest_movie_stats .ep_or_du_wrapper .ep_or_du",
    );
    const ep_or_du_symbol = document.querySelector(
      ".strongest_movie_details .strongest_movie_stats .ep_or_du_wrapper .ep_or_du_symbol",
    );
    const fav = document.querySelector(
      ".strongest_movie_details .strongest_movie_stats .fav_wrapper .fav",
    );
    const posterUrl = `https://image.tmdb.org/t/p/original`;

    try {
      const response = await fetch(`/api/movie/trending`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      const rest_top_ten = data.data_array.slice(1, 10);
      get_ranked_movie(rest_top_ten);
      const send_data = data.data_array[0];
      console.log(send_data);
      // const randomIndex = Math.floor(Math.random() * send_data.length);

      strongest_movie_image.src = `${posterUrl}${send_data.poster_path}`;
      if (send_data.poster_path === null) {
        strongest_movie_image.src = `${posterUrl}${send_data.backdrop_path}`;
      }
      rank.textContent = 1;
      title.textContent = send_data.title;
      status.textContent = send_data.release_date;
      description.textContent = send_data.overview;
      score.textContent = send_data.vote_average;
      fav.textContent = formatNumber(send_data.vote_count);

      // if (send_data.episodes === null) {
      //   ep_or_du_symbol.textContent = "Duration";
      //   ep_or_du.textContent = `${send_data.duration}`;
      // } else {
      //   ep_or_du_symbol.textContent = "Episodes";
      //   ep_or_du.textContent = send_data.episodes;
      // }
      //
      ep_or_du_symbol.textContent = "Lang";
      ep_or_du.textContent = send_data.original_language;
    } catch (error) {
      console.log(
        `error while fetching data from movietrending api of jikan : ${error}`,
      );
    }
  }

  function get_ranked_movie(data) {
    const ranked_movie_list = document.querySelector(".ranked_movie_list");
    ranked_movie_list.innerHTML = "";
    const posterUrl = `https://image.tmdb.org/t/p/original`;

    const ranked_movie = data.map((ani, index) => {
      const ranked_movie = document.createElement("div");
      ranked_movie.className = `ranked_movie`;

      const ranked_movie_rank_wrapper = document.createElement("div");
      ranked_movie_rank_wrapper.className = `ranked_movie_rank_wrapper`;
      const ranked_movie_rank = document.createElement("p");
      ranked_movie_rank.className = `ranked_movie_rank`;
      ranked_movie_rank.textContent = index + 1;
      ranked_movie_rank_wrapper.append(ranked_movie_rank);

      const ranked_movie_image_wrapper = document.createElement("div");
      ranked_movie_image_wrapper.className = `ranked_movie_image_wrapper`;
      const ranked_movie_image = document.createElement("img");
      ranked_movie_image.className = `ranked_movie_image`;
      ranked_movie_image.src = `${posterUrl}${ani.poster_path}`;
      if (ani.poster_path === null) {
        ranked_movie_image.src = `${posterUrl}${ani.backdrop_path}`;
      }
      ranked_movie_image_wrapper.append(ranked_movie_image);

      const ranked_movie_info = document.createElement("div");
      ranked_movie_info.className = `ranked_movie_info`;
      const ranked_movie_title = document.createElement("p");
      ranked_movie_title.className = `ranked_movie_title`;
      ranked_movie_title.textContent = ani.title;

      const ranked_movie_details = document.createElement("div");
      ranked_movie_details.className = `ranked_movie_details`;

      const ranked_movie_type = document.createElement("p");
      ranked_movie_type.className = `ranked_movie_type`;
      ranked_movie_type.textContent = ani.original_language;

      const ranked_movie_status = document.createElement("p");
      ranked_movie_status.className = `ranked_movie_status`;
      ranked_movie_status.textContent = ani.release_date;

      const ranked_movie_fav = document.createElement("p");
      ranked_movie_fav.className = `ranked_movie_fav`;
      ranked_movie_fav.textContent = formatNumber(ani.vote_count);

      ranked_movie_details.append(
        ranked_movie_type,
        ranked_movie_status,
        ranked_movie_fav,
      );
      ranked_movie_info.append(ranked_movie_title, ranked_movie_details);

      const ranked_movie_score_wrapper = document.createElement("div");
      ranked_movie_score_wrapper.className = `ranked_movie_score_wrapper`;
      const ranked_movie_score = document.createElement("p");
      ranked_movie_score.className = `ranked_movie_score`;
      ranked_movie_score.textContent = ani.vote_average.toFixed(2);
      ranked_movie_score_wrapper.append(ranked_movie_score);

      ranked_movie.append(
        ranked_movie_rank_wrapper,
        ranked_movie_image_wrapper,
        ranked_movie_info,
        ranked_movie_score_wrapper,
      );
      return ranked_movie;
    });
    ranked_movie_list.append(...ranked_movie);
  }

  function formatNumber(num) {
    if (!num) return "0";

    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "b";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "m";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return num.toString();
  }

  async function fetch_movie_genre() {
    const genre_list = document.querySelector(".genre_list");
    genre_list.innerHTML = "";
    try {
      const response = await fetch(`/api/movie/genre`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      data.forEach((gen) => {
        const genre = document.createElement("p");
        genre.className = `genre`;
        genre.textContent = gen.genre_name;
        genre.dataset.genre_id = gen.genre_id;

        genre_list.appendChild(genre);
        genre.addEventListener("click", () => {
          get_movie_by_genre(gen.genre_id);
        });
      });
    } catch (error) {
      console.log(
        `error while fetching data from moviesection api of jikan : ${error}`,
      );
    }
  }
  special_category_movie();
  function special_category_movie() {
    const special_category = document.querySelectorAll(".special_category");
    if (special_category.length === 0) {
      return;
    }
    special_category.forEach((sc) => {
      sc.addEventListener("click", () => {
        const category = sc.textContent.trim().toLowerCase();
        get_special_category_movie(category);
      });
    });
  }

  let next_fetch = false;
  let observer_is_active = null;
  let is_fetching = false;

  function get_special_category_movie(topic) {
    const movie_preview_grid = document.querySelector(".movie_preview_grid");
    movie_preview_grid.innerHTML = "";
    let page_number = 1;
    let current_topic = topic;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && next_fetch && !is_fetching) {
          fetch_special_category_movie(current_topic);
        }
      },
      { threshold: 0.1 },
    );

    if (observer_is_active) {
      observer_is_active.disconnect();
    }

    observer.observe(document.querySelector(".observer_bar"));
    observer_is_active = observer;

    fetch_special_category_movie(current_topic);

    async function fetch_special_category_movie(topic) {
      try {
        const response = await fetch(`/api/movie/${topic}/${page_number}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { has_page, send_data } = await response.json();

        console.log(send_data);

        if (has_page) {
          next_fetch = has_page;
          page_number++;
        }

        send_data.forEach((gen) => {
          const card = card_ui(gen);
          movie_preview_grid.appendChild(card);
        });
      } catch (error) {
        console.log(
          `error while fetching data from fetch_special_category_movie frontend : ${error}`,
        );
      }
    }
  }

  function get_movie_by_genre(genre_id) {
    const card_grid = document.querySelector(".card_grid");
    card_grid.innerHTML = "";
    let page_number = 1;
    let current_genre = genre_id;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && next_fetch && !is_fetching) {
          fetch_movie(current_genre);
        }
      },
      { threshold: 0.1 },
    );

    if (observer_is_active) {
      observer_is_active.disconnect();
    }

    observer.observe(document.querySelector(".observer_bar"));
    observer_is_active = observer;

    fetch_movie(genre_id);
    async function fetch_movie(genre_id) {
      if (is_fetching) {
        return;
      }

      is_fetching = true;

      try {
        const response = await fetch(
          `/api/movie/genre/${genre_id}/${page_number}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { has_page, send_data } = await response.json();

        console.log(send_data);

        if (has_page) {
          next_fetch = has_page;
          page_number++;
        }

        send_data.forEach((gen) => {
          const card = card_ui(gen);
          card_grid.appendChild(card);
        });
      } catch (error) {
        console.log(
          `error while fetching data from moviesection api of jikan : ${error}`,
        );
      } finally {
        is_fetching = false;
      }
    }
  }

  function card_ui(content) {
    const posterUrl = `https://image.tmdb.org/t/p/original`;
    const card = document.createElement("a");
    card.className = `card`;
    const poster = document.createElement("img");
    let src_url;

    if (content.poster_path) {
      src_url = `${posterUrl}${content.poster_path}`;
    } else {
      src_url = "images/demo.png ";
    }
    card.dataset.movie_id = content.id;
    poster.src = src_url;
    card.append(poster);
    return card;
  }

  function createSVG(pathData, size = 16, box = "0 0 24 24") {
    const SVG_NS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", box);
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);

    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", pathData);
    svg.appendChild(path);
    return svg;
  }
}
movie_js();
