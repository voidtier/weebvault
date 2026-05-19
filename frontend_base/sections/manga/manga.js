function manga_js() {
  strongest_manga_fetch();
  genreDrawer();

  async function strongest_manga_fetch() {
    const strongest_manga_image = document.querySelector(
      ".strongest_manga_image",
    );
    const rank = document.querySelector(
      ".strongest_manga_details .rank_wrapper .rank",
    );

    const title = document.querySelector(
      ".strongest_manga_details .title_wrapper .title",
    );
    const status = document.querySelector(
      ".strongest_manga_details .status_wrapper .status",
    );
    const description = document.querySelector(
      ".strongest_manga_details .description_wrapper .description",
    );
    const score = document.querySelector(
      ".strongest_manga_details .strongest_manga_stats .score_wrapper .score",
    );
    const ep_or_du = document.querySelector(
      ".strongest_manga_details .strongest_manga_stats .ep_or_du_wrapper .ep_or_du",
    );
    const ep_or_du_symbol = document.querySelector(
      ".strongest_manga_details .strongest_manga_stats .ep_or_du_wrapper .ep_or_du_symbol",
    );
    const fav = document.querySelector(
      ".strongest_manga_details .strongest_manga_stats .fav_wrapper .fav",
    );

    try {
      const response = await fetch(`/api/manga/trending`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      const rest_top_ten = data.data_array.slice(1, 10);
      get_ranked_manga(rest_top_ten);
      const send_data = data.data_array[0];
      console.log(send_data);
      // const randomIndex = Math.floor(Math.random() * send_data.length);

      strongest_manga_image.src = send_data.images.webp.large_image_url;
      rank.textContent = send_data.rank;
      title.textContent = send_data.title;
      status.textContent = send_data.status;
      description.textContent = send_data.synopsis;
      score.textContent = send_data.score;
      fav.textContent = formatNumber(send_data.favorites);

      if (send_data.volumes === null) {
        ep_or_du_symbol.textContent = "Chapters";
        ep_or_du.textContent = `${send_data.chapters}`;
      } else {
        ep_or_du_symbol.textContent = "Volumes";
        ep_or_du.textContent = send_data.volumes;
      }
    } catch (error) {
      console.log(
        `error while fetching data from mangatrending api of jikan : ${error}`,
      );
    }
  }

  function get_ranked_manga(data) {
    const ranked_manga_list = document.querySelector(".ranked_manga_list");
    ranked_manga_list.innerHTML = "";

    const ranked_manga = data.map((ani) => {
      const ranked_manga = document.createElement("div");
      ranked_manga.className = `ranked_manga`;

      const ranked_manga_rank_wrapper = document.createElement("div");
      ranked_manga_rank_wrapper.className = `ranked_manga_rank_wrapper`;
      const ranked_manga_rank = document.createElement("p");
      ranked_manga_rank.className = `ranked_manga_rank`;
      ranked_manga_rank.textContent = ani.rank;
      ranked_manga_rank_wrapper.append(ranked_manga_rank);

      const ranked_manga_image_wrapper = document.createElement("div");
      ranked_manga_image_wrapper.className = `ranked_manga_image_wrapper`;
      const ranked_manga_image = document.createElement("img");
      ranked_manga_image.className = `ranked_manga_image`;
      ranked_manga_image.src = ani.images.webp.large_image_url;
      ranked_manga_image_wrapper.append(ranked_manga_image);

      const ranked_manga_info = document.createElement("div");
      ranked_manga_info.className = `ranked_manga_info`;
      const ranked_manga_title = document.createElement("p");
      ranked_manga_title.className = `ranked_manga_title`;
      ranked_manga_title.textContent = ani.title;

      const ranked_manga_details = document.createElement("div");
      ranked_manga_details.className = `ranked_manga_details`;

      const ranked_manga_type = document.createElement("p");
      ranked_manga_type.className = `ranked_manga_type`;
      ranked_manga_type.textContent = ani.type;

      const ranked_manga_status = document.createElement("p");
      ranked_manga_status.className = `ranked_manga_status`;
      ranked_manga_status.textContent = ani.status;

      const ranked_manga_fav = document.createElement("p");
      ranked_manga_fav.className = `ranked_manga_fav`;
      ranked_manga_fav.textContent = formatNumber(ani.favorites);

      ranked_manga_details.append(
        ranked_manga_type,
        ranked_manga_status,
        ranked_manga_fav,
      );
      ranked_manga_info.append(ranked_manga_title, ranked_manga_details);

      const ranked_manga_score_wrapper = document.createElement("div");
      ranked_manga_score_wrapper.className = `ranked_manga_score_wrapper`;
      const ranked_manga_score = document.createElement("p");
      ranked_manga_score.className = `ranked_manga_score`;
      ranked_manga_score.textContent = ani.score;
      ranked_manga_score_wrapper.append(ranked_manga_score);

      ranked_manga.append(
        ranked_manga_rank_wrapper,
        ranked_manga_image_wrapper,
        ranked_manga_info,
        ranked_manga_score_wrapper,
      );
      return ranked_manga;
    });
    ranked_manga_list.append(...ranked_manga);
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

  async function fetch_manga_genre() {
    const genre_list = document.querySelector(".genre_list");
    genre_list.innerHTML = "";
    try {
      const response = await fetch(`/api/manga/genre`);

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
          get_manga_by_genre(gen.genre_id);
        });
      });
    } catch (error) {
      console.log(
        `error while fetching data from mangasection api of jikan : ${error}`,
      );
    }
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
        const response = await fetch("/api/manga/genre");
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
            get_manga_by_genre(gen.genre_id);
            closeDrawer();
          });

          container.appendChild(btn);
        });
      } catch (error) {
        console.error("Error loading genres:", error);
      }
    }
  }

  special_category_manga();
  function special_category_manga() {
    const manga_filtering_special_category = document.querySelectorAll(
      ".manga_filtering_special_category",
    );
    if (manga_filtering_special_category.length === 0) {
      return;
    }
    manga_filtering_special_category.forEach((sc) => {
      sc.addEventListener("click", () => {
        const category = sc.textContent.trim().toLowerCase();
        get_special_category_manga(category);
      });
    });
  }

  let next_fetch = false;
  let observer_is_active = null;
  let is_fetching = false;

  function get_special_category_manga(topic) {
    const manga_preview_grid = document.querySelector(".manga_preview_grid");
    manga_preview_grid.innerHTML = "";
    let page_number = 1;
    let current_topic = topic;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && next_fetch && !is_fetching) {
          fetch_special_category_manga(current_topic);
        }
      },
      { threshold: 0.1 },
    );

    if (observer_is_active) {
      observer_is_active.disconnect();
    }

    observer.observe(document.querySelector(".observer_bar"));
    observer_is_active = observer;

    fetch_special_category_manga(current_topic);

    async function fetch_special_category_manga(topic) {
      try {
        const response = await fetch(`/api/manga/${topic}/${page_number}`);
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
          manga_preview_grid.appendChild(card);
        });
      } catch (error) {
        console.log(
          `error while fetching data from fetch_special_category_manga frontend : ${error}`,
        );
      }
    }
  }

  function get_manga_by_genre(genre_id) {
    const manga_preview_grid = document.querySelector(".manga_preview_grid");
    manga_preview_grid.innerHTML = "";
    let page_number = 1;
    let current_genre = genre_id;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && next_fetch && !is_fetching) {
          fetch_manga(current_genre);
        }
      },
      { threshold: 0.1 },
    );

    if (observer_is_active) {
      observer_is_active.disconnect();
    }

    observer.observe(document.querySelector(".observer_bar"));
    observer_is_active = observer;

    fetch_manga(genre_id);
    async function fetch_manga(genre_id) {
      if (is_fetching) {
        return;
      }

      is_fetching = true;

      try {
        const response = await fetch(
          `/api/manga/genre/${genre_id}/${page_number}`,
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
          manga_preview_grid.appendChild(card);
        });
      } catch (error) {
        console.log(
          `error while fetching data from mangasection api of jikan : ${error}`,
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
    poster.className = "card_image";
    let src_url;

    if (content.images) {
      src_url = `${content.images.jpg.image_url}`;
    } else {
      src_url = "images/demo.png ";
    }
    card.dataset.manga_id = content.mal_id;
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
manga_js();
