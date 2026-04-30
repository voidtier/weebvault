


function series_js() {
  fetch_series_genre();

  async function fetch_series_genre() {
    const filter_series_by_genre = document.querySelector(".filter_series_by_genre");
    try {
      const response = await fetch(`/api/series/genre`);

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

        filter_series_by_genre.appendChild(genre);
        genre.addEventListener("click", () => {
          get_series_by_genre(gen.genre_id);
        })
      })



    } catch (error) {
      console.log(`error while fetching data from seriessection api of jikan : ${error}`)
    }
  }


  let next_fetch = false;
  let observer_is_active = null;
  let is_fetching = false;
  function get_series_by_genre(genre_id) {

    const series_by_genre = document.querySelector(".series_by_genre");
    series_by_genre.innerHTML = "";
    let page_number = 1;
    let current_genre = genre_id;

    const observer = new IntersectionObserver((entries) => {

      if (entries[0].isIntersecting && next_fetch && !is_fetching) {
        fetch_series(current_genre);
      }


    }, { threshold: 0.1 });

    if (observer_is_active) {
      observer_is_active.disconnect();
    }

    observer.observe(document.querySelector(".observer_bar"));
    observer_is_active = observer


    fetch_series(genre_id)
    async function fetch_series(genre_id) {

      if (is_fetching) { return }

      is_fetching = true;

      try {
        const response = await fetch(`/api/series/genre/${genre_id}/${page_number}`);


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
          series_by_genre.appendChild(card);
        })

      } catch (error) {
        console.log(`error while fetching data from seriessection api of jikan : ${error}`)
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



    const name = document.createElement("p");
    const type = document.createElement("p");
    const first_air_date = document.createElement("p");
    const poster = document.createElement("img");
    let src_url;

    if (content.poster_path) {
      src_url =  `https://image.tmdb.org/t/p/original${content.poster_path}`
    } else {
      src_url = "images/demo.png "
    }

    name.textContent = content.name || content.title;
    type.textContent = content.type;
    first_air_date.textContent = content.first_air_date;


    poster.src = src_url;
    card_info.append(name, type, first_air_date)
    card.append(poster, card_info)
    return card;
  }
}
series_js();