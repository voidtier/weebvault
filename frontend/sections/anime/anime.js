function anime_js() {
  fetch_anime_genre();
  fetch_top_anime();

  async function fetch_anime_genre() {
    const filter_anime_by_genre = document.querySelector(
      ".filter_anime_by_genre",
    );
    try {
      const response = await fetch(`/api/anime/genre`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      data.forEach((gen) => {
        const genre = document.createElement("button");
        genre.className = `genre`;
        genre.type = "button";
        genre.textContent = gen.genre_name;
        genre.dataset.genre_id = gen.genre_id;

        filter_anime_by_genre.appendChild(genre);
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

  let next_fetch = false;
  let observer_is_active = null;
  let is_fetching = false;
  function get_anime_by_genre(genre_id) {
    const anime_by_genre = document.querySelector(".anime_by_genre");
    anime_by_genre.innerHTML = "";
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
          anime_by_genre.appendChild(card);
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

  async function fetch_top_anime() {
    const top_anime_carousel = document.querySelector("#top_anime_carousel");
    try {
      const response = await fetch(`/api/anime/top`);
      if (!response.ok) {
        return;
      }

      const { has_page, send_data } = await response.json();

      send_data.forEach((ani) => {
        const card = card_ui(ani);
        top_anime_carousel.append(card);
      });
    } catch (error) {
      console.log(`error while fetching in frontend top_anime :${error}`);
    }
  }

  function card_ui(content) {
    const card = document.createElement("a");
    card.className = `card`;

    const card_info = document.createElement("div");
    card_info.className = `card_info`;

    const title_en = document.createElement("p");
    const type = document.createElement("p");
    const status = document.createElement("p");
    const poster = document.createElement("img");
    let src_url;

    if (content.images) {
      src_url = `${content.images.jpg.image_url}`;
    } else {
      src_url = "images/demo.png ";
    }

    title_en.textContent = content.title_en || content.title;
    type.textContent = content.type;
    status.textContent = content.status;

    poster.src = src_url;
    card_info.append(title_en, type, status);
    card.append(poster, card_info);
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

  function scroll() {
    const scrollButton = document.querySelectorAll(".scrollButton");
    scrollButton.forEach((button) => {
      button.addEventListener("click", (carou) => {
        carou.stopPropagation();
        const carousel = button
          .closest(".carousel_wrapper")
          .querySelector(".carousel");

        if (button.classList.contains("leftArrow")) {
          carousel.scrollBy({ left: -320, behavior: "smooth" });
        } else {
          carousel.scrollBy({ left: 320, behavior: "smooth" });
        }
      });
    });
  }

  scroll();
}
anime_js();
