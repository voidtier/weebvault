


function manga_js() {
  fetch_manga_genre();

  async function fetch_manga_genre() {
    const filter_manga_by_genre = document.querySelector(".filter_manga_by_genre");
    try {
      const response = await fetch(`/api/manga/genre`);

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

        filter_manga_by_genre.appendChild(genre);
        genre.addEventListener("click", () => {
          get_manga_by_genre(gen.genre_id);
        })
      })



    } catch (error) {
      console.log(`error while fetching data from mangasection api of jikan : ${error}`)
    }
  }


  let next_fetch = false;
  let observer_is_active = null;
  let is_fetching = false;
  function get_manga_by_genre(genre_id) {

    const manga_by_genre = document.querySelector(".manga_by_genre");
    manga_by_genre.innerHTML = "";
    let page_number = 1;
    let current_genre = genre_id;

    const observer = new IntersectionObserver((entries) => {

      if (entries[0].isIntersecting && next_fetch && !is_fetching) {
        fetch_manga(current_genre);
      }


    }, { threshold: 0.1 });

    if (observer_is_active) {
      observer_is_active.disconnect();
    }

    observer.observe(document.querySelector(".observer_bar"));
    observer_is_active = observer


    fetch_manga(genre_id)
    async function fetch_manga(genre_id) {

      if (is_fetching) { return }

      is_fetching = true;

      try {
        const response = await fetch(`/api/manga/genre/${genre_id}/${page_number}`);


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
          manga_by_genre.appendChild(card);
        })

      } catch (error) {
        console.log(`error while fetching data from mangasection api of jikan : ${error}`)
      } finally {
        is_fetching = false;
      }


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
      src_url = `${content.images.jpg.image_url}`
    } else {
      src_url = "images/demo.png "
    }

    title_en.textContent = content.title_en || content.title;
    type.textContent = content.type;
    status.textContent = content.status;


    poster.src = src_url;
    card_info.append(title_en, type, status)
    card.append(poster, card_info)
    return card;
  }
}
manga_js();