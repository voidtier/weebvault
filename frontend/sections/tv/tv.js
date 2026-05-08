function tv_js() {
  strongest_tv_fetch();
  genreDrawer();

  async function strongest_tv_fetch() {
    const strongest_tv_image = document.querySelector(".strongest_tv_image");
    const rank = document.querySelector(
      ".strongest_tv_details .rank_wrapper .rank",
    );

    const title = document.querySelector(
      ".strongest_tv_details .title_wrapper .title",
    );
    const status = document.querySelector(
      ".strongest_tv_details .status_wrapper .status",
    );
    const description = document.querySelector(
      ".strongest_tv_details .description_wrapper .description",
    );
    const score = document.querySelector(
      ".strongest_tv_details .strongest_tv_stats .score_wrapper .score",
    );
    const ep_or_du = document.querySelector(
      ".strongest_tv_details .strongest_tv_stats .ep_or_du_wrapper .ep_or_du",
    );
    const ep_or_du_symbol = document.querySelector(
      ".strongest_tv_details .strongest_tv_stats .ep_or_du_wrapper .ep_or_du_symbol",
    );
    const fav = document.querySelector(
      ".strongest_tv_details .strongest_tv_stats .fav_wrapper .fav",
    );
    const posterUrl = `https://image.tmdb.org/t/p/original`;

    try {
      const response = await fetch(`/api/tv/trending`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      const rest_top_ten = data.data_array.slice(1, 10);
      get_ranked_tv(rest_top_ten);
      const send_data = data.data_array[0];
      console.log(send_data);
      // const randomIndex = Math.floor(Math.random() * send_data.length);

      strongest_tv_image.src = `${posterUrl}${send_data.poster_path}`;
      if (send_data.poster_path === null) {
        strongest_tv_image.src = `${posterUrl}${send_data.backdrop_path}`;
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
        `error while fetching data from tvtrending api of jikan : ${error}`,
      );
    }
  }

  function get_ranked_tv(data) {
    const ranked_tv_list = document.querySelector(".ranked_tv_list");
    ranked_tv_list.innerHTML = "";
    const posterUrl = `https://image.tmdb.org/t/p/original`;

    const ranked_tv = data.map((ani, index) => {
      const ranked_tv = document.createElement("div");
      ranked_tv.className = `ranked_tv`;

      const ranked_tv_rank_wrapper = document.createElement("div");
      ranked_tv_rank_wrapper.className = `ranked_tv_rank_wrapper`;
      const ranked_tv_rank = document.createElement("p");
      ranked_tv_rank.className = `ranked_tv_rank`;
      ranked_tv_rank.textContent = index + 1;
      ranked_tv_rank_wrapper.append(ranked_tv_rank);

      const ranked_tv_image_wrapper = document.createElement("div");
      ranked_tv_image_wrapper.className = `ranked_tv_image_wrapper`;
      const ranked_tv_image = document.createElement("img");
      ranked_tv_image.className = `ranked_tv_image`;
      ranked_tv_image.src = `${posterUrl}${ani.poster_path}`;
      if (ani.poster_path === null) {
        ranked_tv_image.src = `${posterUrl}${ani.backdrop_path}`;
      }
      ranked_tv_image_wrapper.append(ranked_tv_image);

      const ranked_tv_info = document.createElement("div");
      ranked_tv_info.className = `ranked_tv_info`;
      const ranked_tv_title = document.createElement("p");
      ranked_tv_title.className = `ranked_tv_title`;
      ranked_tv_title.textContent = ani.title;

      const ranked_tv_details = document.createElement("div");
      ranked_tv_details.className = `ranked_tv_details`;

      const ranked_tv_type = document.createElement("p");
      ranked_tv_type.className = `ranked_tv_type`;
      ranked_tv_type.textContent = ani.original_language;

      const ranked_tv_status = document.createElement("p");
      ranked_tv_status.className = `ranked_tv_status`;
      ranked_tv_status.textContent = ani.release_date;

      const ranked_tv_fav = document.createElement("p");
      ranked_tv_fav.className = `ranked_tv_fav`;
      ranked_tv_fav.textContent = formatNumber(ani.vote_count);

      ranked_tv_details.append(ranked_tv_type, ranked_tv_status, ranked_tv_fav);
      ranked_tv_info.append(ranked_tv_title, ranked_tv_details);

      const ranked_tv_score_wrapper = document.createElement("div");
      ranked_tv_score_wrapper.className = `ranked_tv_score_wrapper`;
      const ranked_tv_score = document.createElement("p");
      ranked_tv_score.className = `ranked_tv_score`;
      ranked_tv_score.textContent = ani.vote_average.toFixed(2);
      ranked_tv_score_wrapper.append(ranked_tv_score);

      ranked_tv.append(
        ranked_tv_rank_wrapper,
        ranked_tv_image_wrapper,
        ranked_tv_info,
        ranked_tv_score_wrapper,
      );
      return ranked_tv;
    });
    ranked_tv_list.append(...ranked_tv);
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

  function genreDrawer() {
    const genreOpener = document.querySelector(".genre_opener");
    const genre_displayer = document.querySelector(".genre_displayer");
    if (!genreOpener) return;
    // Create drawer HTML dynamically
    const drawerHTML = `
      <div class="genre_drawer_overlay" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.7); z-index:3000;"></div>
      <div class="genre_drawer" style="position:fixed; right:-400px; top:0; width:380px; height:100vh; background:var(--surface); z-index:3001; transition:right 0.3s ease; overflow-y:auto; padding:20px; box-shadow:var(--shadow);">
        <div class="genre_drawer_header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; padding-bottom:15px; border-bottom:1px solid var(--border);">
          <h3 style="color:var(--text-muted); font-size:18px;">Filter by Genre</h3>
          <button class="close_genre_drawer" style="background:transparent; border:none; cursor:pointer; padding:8px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--text-muted)">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
        <div class="genre_list_container" style="display:flex; flex-wrap:wrap; gap:10px;"></div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", drawerHTML);
    const drawer = document.querySelector(".genre_drawer");
    const overlay = document.querySelector(".genre_drawer_overlay");
    const closeBtn = document.querySelector(".close_genre_drawer");
    const container = document.querySelector(".genre_list_container");
    genreOpener.addEventListener("click", async () => {
      drawer.style.right = "0px";
      overlay.style.display = "block";

      // Fetch genres if not already loaded
      if (container.innerHTML.trim() === "") {
        await loadGenres();
      }
    });
    closeBtn.addEventListener("click", closeDrawer);
    overlay.addEventListener("click", closeDrawer);
    function closeDrawer() {
      drawer.style.right = "-400px";
      overlay.style.display = "none";
    }
    async function loadGenres() {
      try {
        const response = await fetch("/api/tv/genre");
        const genres = await response.json();

        genres.forEach((gen) => {
          const btn = document.createElement("button");
          btn.textContent = gen.genre_name;
          btn.style.cssText =
            "padding:8px 16px; background:var(--button); border:1px solid var(--border); border-radius:20px; color:var(--text-muted); font-size:12px; cursor:pointer; transition:all 0.2s;";
          btn.onmouseover = () => {
            btn.style.borderColor = "var(--accent)";
            btn.style.color = "var(--accent)";
          };
          btn.onmouseout = () => {
            btn.style.borderColor = "var(--border)";
            btn.style.color = "var(--text-muted)";
          };

          btn.addEventListener("click", () => {
            genre_displayer.textContent = gen.genre_name;
            get_tv_by_genre(gen.genre_id);
            closeDrawer();
          });

          container.appendChild(btn);
        });
      } catch (error) {
        console.error("Error loading genres:", error);
      }
    }
  }

  // async function fetch_tv_genre() {
  //   const genre_list = document.querySelector(".genre_list");
  //   genre_list.innerHTML = "";
  //   try {
  //     const response = await fetch(`/api/tv/genre`);

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();

  //     data.forEach((gen) => {
  //       const genre = document.createElement("p");
  //       genre.className = `genre`;
  //       genre.textContent = gen.genre_name;
  //       genre.dataset.genre_id = gen.genre_id;

  //       genre_list.appendChild(genre);
  //       genre.addEventListener("click", () => {
  //         get_tv_by_genre(gen.genre_id);
  //       });
  //     });
  //   } catch (error) {
  //     console.log(
  //       `error while fetching data from tvsection api of jikan : ${error}`,
  //     );
  //   }
  // }
  special_category_tv();
  function special_category_tv() {
    const tv_filtering_special_category = document.querySelectorAll(
      ".tv_filtering_special_category",
    );
    if (tv_filtering_special_category.length === 0) {
      return;
    }
    tv_filtering_special_category.forEach((sc) => {
      sc.addEventListener("click", () => {
        const category = sc.textContent.trim().toLowerCase();
        get_special_category_tv(category);
      });
    });
  }

  let next_fetch = false;
  let observer_is_active = null;
  let is_fetching = false;

  function get_special_category_tv(topic) {
    const tv_preview_grid = document.querySelector(".tv_preview_grid");
    tv_preview_grid.innerHTML = "";
    let page_number = 1;
    let current_topic = topic;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && next_fetch && !is_fetching) {
          fetch_special_category_tv(current_topic);
        }
      },
      { threshold: 0.1 },
    );

    if (observer_is_active) {
      observer_is_active.disconnect();
    }

    observer.observe(document.querySelector(".observer_bar"));
    observer_is_active = observer;

    fetch_special_category_tv(current_topic);

    async function fetch_special_category_tv(topic) {
      try {
        const response = await fetch(`/api/tv/${topic}/${page_number}`);
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
          tv_preview_grid.appendChild(card);
        });
      } catch (error) {
        console.log(
          `error while fetching data from fetch_special_category_tv frontend : ${error}`,
        );
      }
    }
  }

  function get_tv_by_genre(genre_id) {
    const tv_preview_grid = document.querySelector(".tv_preview_grid");
    tv_preview_grid.innerHTML = "";
    let page_number = 1;
    let current_genre = genre_id;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && next_fetch && !is_fetching) {
          fetch_tv(current_genre);
        }
      },
      { threshold: 0.1 },
    );

    if (observer_is_active) {
      observer_is_active.disconnect();
    }

    observer.observe(document.querySelector(".observer_bar"));
    observer_is_active = observer;

    fetch_tv(genre_id);
    async function fetch_tv(genre_id) {
      if (is_fetching) {
        return;
      }

      is_fetching = true;

      try {
        const response = await fetch(
          `/api/tv/genre/${genre_id}/${page_number}`,
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
          tv_preview_grid.appendChild(card);
        });
      } catch (error) {
        console.log(
          `error while fetching data from tvsection api of jikan : ${error}`,
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
    poster.className = "card_image";
    let src_url;

    if (content.poster_path) {
      src_url = `${posterUrl}${content.poster_path}`;
    } else {
      src_url = "images/demo.png ";
    }
    card.dataset.tv_id = content.id;
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
tv_js();
