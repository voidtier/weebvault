


function movies_js() {
  fetch_movies_genre();

  async function fetch_movies_genre() {
    const filter_movies_by_genre = document.querySelector(".filter_movies_by_genre");
    try {
      const response = await fetch(`/api/movies/genre`);

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

        filter_movies_by_genre.appendChild(genre);
        genre.addEventListener("click", () => {
          get_movies_by_genre(gen.genre_id);
        })
      })



    } catch (error) {
      console.log(`error while fetching data from moviessection api of jikan : ${error}`)
    }
  }


  let next_fetch = false;
  let observer_is_active = null;
  let is_fetching = false;
  function get_movies_by_genre(genre_id) {

    const movies_by_genre = document.querySelector(".movies_by_genre");
    movies_by_genre.innerHTML = "";
    let page_number = 1;
    let current_genre = genre_id;

    const observer = new IntersectionObserver((entries) => {

      if (entries[0].isIntersecting && next_fetch && !is_fetching) {
        fetch_movies(current_genre);
      }


    }, { threshold: 0.1 });

    if (observer_is_active) {
      observer_is_active.disconnect();
    }

    observer.observe(document.querySelector(".observer_bar"));
    observer_is_active = observer


    fetch_movies(genre_id)
    async function fetch_movies(genre_id) {

      if (is_fetching) { return }

      is_fetching = true;

      try {
        const response = await fetch(`/api/movies/genre/${genre_id}/${page_number}`);


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
          movies_by_genre.appendChild(card);
        })

      } catch (error) {
        console.log(`error while fetching data from moviessection api of jikan : ${error}`)
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
    const release_date = document.createElement("p");
    const poster = document.createElement("img");
    let src_url;

    if (content.poster_path) {
      src_url =  `https://image.tmdb.org/t/p/original${content.poster_path}`
    } else {
      src_url = "images/demo.png "
    }

    title_en.textContent = content.title_en || content.title;
    type.textContent = content.type;
    release_date.textContent = content.release_date;


    poster.src = src_url;
    card_info.append(title_en, type, release_date)
    card.append(poster, card_info)
    return card;
  }
}
movies_js();