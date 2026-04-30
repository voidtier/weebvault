


function anime_js() {
  fetch_anime_genre();

  async function fetch_anime_genre() {
    const filter_anime_by_genre = document.querySelector(".filter_anime_by_genre");
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
        })
      })



    } catch (error) {
      console.log(`error while fetching data from animesection api of jikan : ${error}`)
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

    const observer = new IntersectionObserver((entries) => {

      if (entries[0].isIntersecting && next_fetch && !is_fetching) {
        fetch_anime(current_genre);
      }


    }, { threshold: 0.1 });

    if (observer_is_active) {
      observer_is_active.disconnect();
    }

    observer.observe(document.querySelector(".observer_bar"));
    observer_is_active = observer


    fetch_anime(genre_id)
    async function fetch_anime(genre_id) {

      if (is_fetching) { return }

      is_fetching = true;

      try {
        const response = await fetch(`/api/anime/genre/${genre_id}/${page_number}`);


        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { has_page, send_data } = await response.json();

        if (has_page) {
          next_fetch = has_page
          page_number++
        }

        send_data.forEach((gen) => {
          const card = card_ui(gen);
          anime_by_genre.appendChild(card);
        })

      } catch (error) {
        console.log(`error while fetching data from animesection api of jikan : ${error}`)
      } finally {
        is_fetching = false;
      }


    }

  }


  function card_ui(content) {
    const card = document.createElement("a");
    card.className = `card`;

    const card_overlay = document.createElement("div");
    card_overlay.className = `card_overlay`;



    const title_en = document.createElement("p");
    const type = document.createElement("p");
    const status = document.createElement("p");
    const poster = document.createElement("img");

    const card_modal = document.createElement("dialog");
    card_modal.className = `card_modal`;
    const card_modal_wrapper = document.createElement("div");
    card_modal_wrapper.className = `card_modal_wrapper`;
    card_modal.append(card_modal_wrapper);



    const more_buttons_wrapper = document.createElement("div");
    more_buttons_wrapper.className = `more_buttons_wrapper`;

    const info = document.createElement("div");
    info.className = `info`;
    const track = document.createElement("div");
    track.className = `track`;

    const info_button = document.createElement("button");
    info_button.className = `info_button`;
    info_button.textContent = `info`;

    const track_button = document.createElement("button");
    track_button.className = `track_button`;
    track_button.textContent = `track`;

    info.appendChild(info_button);
    track.appendChild(track_button);
    more_buttons_wrapper.append(info, track)


    const more_button_path_data = "M479.79-192Q450-192 429-213.21t-21-51Q408-294 429.21-315t51-21Q510-336 531-314.79t21 51Q552-234 530.79-213t-51 21Zm0-216Q450-408 429-429.21t-21-51Q408-510 429.21-531t51-21Q510-552 531-530.79t21 51Q552-450 530.79-429t-51 21Zm0-216Q450-624 429-645.21t-21-51Q408-726 429.21-747t51-21Q510-768 531-746.79t21 51Q552-666 530.79-645t-51 21Z"

    const more_button = createSVG(more_button_path_data, size = 16, box = "0 -960 960 960");

    more_button.classList.add("more_button")

    more_button.popoverTargetElement = card_modal; // Link the button to the modal
    more_button.popoverTargetAction = "toggle";    // Tell it to toggle open/close

    // Instead of <dialog>, use the popover attribute
    card_modal.setAttribute("popover", "auto");

    let src_url;

    if (content.images) {
      src_url = `${content.images.jpg.image_url}`
    } else {
      src_url = "images/demo.png "
    }

    title_en.textContent = content.title_en || content.title;
    type.textContent = content.type;
    status.textContent = content.status;


    poster.src = src_url;


    card_modal_wrapper.append(title_en, type, status, more_buttons_wrapper);
    card_overlay.append(more_button);
    document.body.appendChild(card_modal);
    card.append(poster, card_overlay);





    // more_button.addEventListener("click", (e) => {


    //   e.stopPropagation();
    //   if (card_modal.open) {
    //     card_modal.close();
    //   } else {
    //     const rect = more_button.getBoundingClientRect();
    //     card_modal.style.top = `${rect.bottom + 8}px`;
    //     card_modal.style.left = `${rect.left - 120}px`;
    //     card_modal.show();


    //     window.addEventListener("scroll", () => {
    //       card_modal.close();
    //     }, { once: true });
    //   }
    // });

    // window.addEventListener("click", (e) => {
    //   if (!more_button.contains(e.target) && !card_modal.contains(e.target)) {
    //     card_modal.close();
    //   }
    // });

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