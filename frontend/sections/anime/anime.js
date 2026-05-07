function anime_js() {
  // fetch_anime_genre();

  strongest_anime_fetch();
  async function strongest_anime_fetch() {
    const strongest_anime_image = document.querySelector(
      ".strongest_anime_image",
    );
    const rank = document.querySelector(
      ".strongest_anime_details .rank_wrapper .rank",
    );

    const title = document.querySelector(
      ".strongest_anime_details .title_wrapper .title",
    );
    const status = document.querySelector(
      ".strongest_anime_details .status_wrapper .status",
    );
    const description = document.querySelector(
      ".strongest_anime_details .description_wrapper .description",
    );
    const score = document.querySelector(
      ".strongest_anime_details .strongest_anime_stats .score_wrapper .score",
    );
    const ep_or_du = document.querySelector(
      ".strongest_anime_details .strongest_anime_stats .ep_or_du_wrapper .ep_or_du",
    );
    const ep_or_du_symbol = document.querySelector(
      ".strongest_anime_details .strongest_anime_stats .ep_or_du_wrapper .ep_or_du_symbol",
    );
    const fav = document.querySelector(
      ".strongest_anime_details .strongest_anime_stats .fav_wrapper .fav",
    );

    try {
      const response = await fetch(`/api/anime/trending`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      const rest_top_ten = data.data_array.slice(1, 10);
      get_ranked_anime(rest_top_ten);
      const send_data = data.data_array[0];
      console.log(send_data);
      // const randomIndex = Math.floor(Math.random() * send_data.length);

      strongest_anime_image.src = send_data.images.webp.large_image_url;
      rank.textContent = send_data.rank;
      title.textContent = send_data.title;
      status.textContent = send_data.status;
      description.textContent = send_data.synopsis;
      score.textContent = send_data.score;
      fav.textContent = formatNumber(send_data.favorites);

      if (send_data.episodes === null) {
        ep_or_du_symbol.textContent = "Duration";
        ep_or_du.textContent = `${send_data.duration}`;
      } else {
        ep_or_du_symbol.textContent = "Episodes";
        ep_or_du.textContent = send_data.episodes;
      }
    } catch (error) {
      console.log(
        `error while fetching data from animetrending api of jikan : ${error}`,
      );
    }
  }

  function get_ranked_anime(data) {
    const ranked_anime_list = document.querySelector(".ranked_anime_list");
    ranked_anime_list.innerHTML = "";

    const ranked_anime = data.map((ani) => {
      const ranked_anime = document.createElement("div");
      ranked_anime.className = `ranked_anime`;

      const ranked_anime_rank_wrapper = document.createElement("div");
      ranked_anime_rank_wrapper.className = `ranked_anime_rank_wrapper`;
      const ranked_anime_rank = document.createElement("p");
      ranked_anime_rank.className = `ranked_anime_rank`;
      ranked_anime_rank.textContent = ani.rank;
      ranked_anime_rank_wrapper.append(ranked_anime_rank);

      const ranked_anime_image_wrapper = document.createElement("div");
      ranked_anime_image_wrapper.className = `ranked_anime_image_wrapper`;
      const ranked_anime_image = document.createElement("img");
      ranked_anime_image.className = `ranked_anime_image`;
      ranked_anime_image.src = ani.images.webp.large_image_url;
      ranked_anime_image_wrapper.append(ranked_anime_image);

      const ranked_anime_info = document.createElement("div");
      ranked_anime_info.className = `ranked_anime_info`;
      const ranked_anime_title = document.createElement("p");
      ranked_anime_title.className = `ranked_anime_title`;
      ranked_anime_title.textContent = ani.title;

      const ranked_anime_details = document.createElement("div");
      ranked_anime_details.className = `ranked_anime_details`;

      const ranked_anime_type = document.createElement("p");
      ranked_anime_type.className = `ranked_anime_type`;
      ranked_anime_type.textContent = ani.type;

      const ranked_anime_status = document.createElement("p");
      ranked_anime_status.className = `ranked_anime_status`;
      ranked_anime_status.textContent = ani.status;

      const ranked_anime_fav = document.createElement("p");
      ranked_anime_fav.className = `ranked_anime_fav`;
      ranked_anime_fav.textContent = formatNumber(ani.favorites);

      ranked_anime_details.append(
        ranked_anime_type,
        ranked_anime_status,
        ranked_anime_fav,
      );
      ranked_anime_info.append(ranked_anime_title, ranked_anime_details);

      const ranked_anime_score_wrapper = document.createElement("div");
      ranked_anime_score_wrapper.className = `ranked_anime_score_wrapper`;
      const ranked_anime_score = document.createElement("p");
      ranked_anime_score.className = `ranked_anime_score`;
      ranked_anime_score.textContent = ani.score;
      ranked_anime_score_wrapper.append(ranked_anime_score);

      ranked_anime.append(
        ranked_anime_rank_wrapper,
        ranked_anime_image_wrapper,
        ranked_anime_info,
        ranked_anime_score_wrapper,
      );
      return ranked_anime;
    });
    ranked_anime_list.append(...ranked_anime);
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

  async function fetch_anime_genre() {
    const genre_list = document.querySelector(".genre_list");
    genre_list.innerHTML = "";
    try {
      const response = await fetch(`/api/anime/genre`);

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
          get_anime_by_genre(gen.genre_id);
        });
      });
    } catch (error) {
      console.log(
        `error while fetching data from animesection api of jikan : ${error}`,
      );
    }
  }
  special_category_anime();
  function special_category_anime() {
    const special_category = document.querySelectorAll(".special_category");
    if (special_category.length === 0) {
      return;
    }
    special_category.forEach((sc) => {
      sc.addEventListener("click", () => {
        const category = sc.textContent.trim().toLowerCase();
        get_special_category_anime(category);
      });
    });
  }

  let next_fetch = false;
  let observer_is_active = null;
  let is_fetching = false;

  function get_special_category_anime(topic) {
    const anime_preview_grid = document.querySelector(".anime_preview_grid");
    anime_preview_grid.innerHTML = "";
    let page_number = 1;
    let current_topic = topic;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && next_fetch && !is_fetching) {
          fetch_special_category_anime(current_topic);
        }
      },
      { threshold: 0.1 },
    );

    if (observer_is_active) {
      observer_is_active.disconnect();
    }

    observer.observe(document.querySelector(".observer_bar"));
    observer_is_active = observer;

    fetch_special_category_anime(current_topic);

    async function fetch_special_category_anime(topic) {
      try {
        const response = await fetch(`/api/anime/${topic}/${page_number}`);
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
          anime_preview_grid.appendChild(card);
        });
      } catch (error) {
        console.log(
          `error while fetching data from fetch_special_category_anime frontend : ${error}`,
        );
      }
    }
  }

  function get_anime_by_genre(genre_id) {
    const card_grid = document.querySelector(".card_grid");
    card_grid.innerHTML = "";
    let page_number = 1;
    let current_genre = genre_id;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && next_fetch && !is_fetching) {
          fetch_anime(current_genre);
        }
      },
      { threshold: 0.1 },
    );

    if (observer_is_active) {
      observer_is_active.disconnect();
    }

    observer.observe(document.querySelector(".observer_bar"));
    observer_is_active = observer;

    fetch_anime(genre_id);
    async function fetch_anime(genre_id) {
      if (is_fetching) {
        return;
      }

      is_fetching = true;

      try {
        const response = await fetch(
          `/api/anime/genre/${genre_id}/${page_number}`,
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
          card.addEventListener("click", () => {
            const info_modal_wrapper = document.querySelector(
              ".info_modal_wrapper",
            );
            info_modal_wrapper.style.display = "flex";
            document.body.append(info_modal_wrapper);
          });
        });
      } catch (error) {
        console.log(
          `error while fetching data from animesection api of jikan : ${error}`,
        );
      } finally {
        is_fetching = false;
      }
    }
  }

  function card_ui(content) {
    const card = document.createElement("a");
    card.className = `card`;
    const poster = document.createElement("img");
    let src_url;

    if (content.images) {
      src_url = `${content.images.jpg.image_url}`;
    } else {
      src_url = "images/demo.png ";
    }
    card.dataset.anime_id = content.mal_id;
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
anime_js();
