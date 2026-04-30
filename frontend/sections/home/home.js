

heroPageBanner();




async function heroPageBanner() {
  const landing_bg = document.getElementById("landing-bg");

  try {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const response = await fetch(`https://api.jikan.moe/v4/schedules?filter=${today}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();
    const randomIndex = Math.floor(Math.random() * data.length);

    landing_bg.style.backgroundImage = `url(${data[randomIndex].images.jpg.large_image_url})`;
    landing_bg.classList.add('active');


  } catch (error) {
    console.log(`error while fetching data from animetrending api of jikan : ${error}`)
  }
}









animeCarouselFunction();

async function animeCarouselFunction() {
  const popularAnime = document.querySelector(".carousel");
  try {

    const response = await fetch(`https://api.jikan.moe/v4/top/anime?`)

    if (!response.ok) {
      throw new Error;
    }

    const { data } = await response.json();

    console.log(data);
    data.forEach((content) => {
      const card = card_ui(content);

      popularAnime.append(card);
    })


  } catch (error) {
    console.log(`error while fetching data from animetrending api of jikan : ${error}`)
  }
}
get_search_query()

function get_search_query() {
  const search_bar = document.querySelector(".search_bar");

  search_bar.addEventListener("input", () => {
    const search_query = search_bar.value.trim().toLowerCase();

    const select = document.querySelector('.category_selection');
    const category = select.value.trim().toLowerCase();
    search_function(search_query, category);
  })

}




let observer_is_active = null;
let is_fetching = false;

function search_function(query, type) {
  const next_fetch = {
    anime: true,
    manga: true,
    movies: true,
    tv: true,
  }
  const page = {
    anime: 1,
    manga: 1,
    movies: 1,
    tv: 1,
  }

  const searched_card_grid = document.querySelector(".searched_card_grid");
  searched_card_grid.innerHTML = "";
const searched_content = document.querySelector(".searched_content");

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !is_fetching) {
    if (type === "all") {
      search_all(query);
    } else {
      search_individual(type, query);
    }
  }
}, { root: searched_content, threshold: 0.1 }); 


  if (observer_is_active) {
    observer_is_active.disconnect();
  }

  observer.observe(document.querySelector(".searched_observer_bar"));
  observer_is_active = observer

  if (type === "all") {
    search_all(query);
  } else {
    search_individual(type, query);
  }
  async function search_all(query) {
    if (is_fetching) { return }
    is_fetching = true;


    try {

      const fetch_all = [];

      if (next_fetch.anime) {
        fetch_all.push(search_fetch("anime", query, page.anime))
      }
      if (next_fetch.manga) {
        fetch_all.push(search_fetch("manga", query, page.manga))
      }
      if (next_fetch.movies) {
        fetch_all.push(search_fetch("movies", query, page.movies))
      }
      if (next_fetch.tv) {
        fetch_all.push(search_fetch("tv", query, page.tv))
      }


      const data = await Promise.all(fetch_all);

      data.forEach((d) => {
        next_fetch[d.type] = d.has_page
        if (d.has_page) { page[d.type]++ }

        d.send_data.forEach((gen) => {
          const card = card_ui(gen);
          searched_card_grid.appendChild(card);
        })

      })
    } catch (error) {
      console.log(`error while fetching data from animesection api of jikan : ${error}`)
    } finally {
      is_fetching = false;
    }



  }
  async function search_individual(type, query) {

    if (is_fetching) { return }
    is_fetching = true;

    try {
      const { send_data, has_page } = await search_fetch(type, query, page[type]);

      if (has_page) {
        next_fetch[type] = has_page
        page[type]++
      }

      send_data.forEach((gen) => {
        const card = card_ui(gen);
        searched_card_grid.appendChild(card);
      })

    } catch (error) {
      console.log(`error while fetching data from api : ${error}`)
    } finally {
      is_fetching = false;
    }


  }

  async function search_fetch(type, query, page_number) {

    try {
      const response = await fetch(`/api/${type}/${query}/${page_number}`);


      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return data;

    } catch (error) {
      console.log(`error while fetching data from fetching type content: ${error}`)
    }
  }

}



function card_ui(content) {
  const card = document.createElement("a");
  card.className = `card`;

  const cardInfo = document.createElement("div");
  cardInfo.className = `cardInfo`;



  const title_en = document.createElement("p");
  const type = document.createElement("p");
  const status = document.createElement("p");
  const poster = document.createElement("img");
  let srcUrl;

  if (content.images) {
    srcUrl = `${content.images.jpg.image_url}`
  } else {
    srcUrl = "images/demo.png "
  }

  title_en.textContent = content.title_english || content.title;
  type.textContent = content.type;
  status.textContent = content.status;


  poster.src = srcUrl;
  cardInfo.append(title_en, type, status)
  card.append(poster, cardInfo)
  return card;
}

scroll()
function scroll() {
  const scrollButton = document.querySelectorAll('.scrollButton')
  scrollButton.forEach((button) => {

    button.addEventListener("click", (carou) => {
      carou.stopPropagation();
      const carousel = button.closest(".carousel_wrapper").querySelector('.carousel');

      if (button.classList.contains("leftArrow")) {
        carousel.scrollBy({ left: -320, behavior: "smooth" });
      }
      else {
        carousel.scrollBy({ left: 320, behavior: "smooth" });
      }

    });

  });
};