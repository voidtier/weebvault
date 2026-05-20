import Anime_preview_card_grid from "./Anime_preview_card_grid";
import Anime_preview_filter_list from "./Anime_preview_filter_list";
import { useEffect, useState } from "react";
export default function Anime_preview({ changed_category }) {
  const [fetched_data, set_fetched_data] = useState([]);
  const [page_number, set_page_number] = useState(1);
  useEffect(() => {
    const { fetch_category, fetch_id, special_name } = changed_category;
    if (fetch_category === "genre" && !fetch_id) return;
    if (fetch_category === "special" && !special_name) return;

    let url;
    if (changed_category.fetch_category === "genre") {
      url = `http://localhost:4000/api/anime/genre/${changed_category.fetch_id}/${page_number}`;
    }
    if (changed_category.fetch_category === "special") {
      url = `http://localhost:4000/api/anime/category/${changed_category.special_name}/${page_number}`;
    }

    async function data_fetch() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { send_data } = await response.json();
        if (!send_data) return;
        console.log(send_data);
        set_fetched_data(send_data);
      } catch (error) {
        console.log(`error  : ${error}`);
      }
    }
    data_fetch();
  }, [changed_category]);

  if (fetched_data.length === 0) {
    return (
      <>
        <h1 className="text-4xl text-gray-300">Please wait</h1>
      </>
    );
  }

  return (
    <>
      <section className="max-w-[85%] h-full p-5">
        <Anime_preview_filter_list />
        <Anime_preview_card_grid card_data={fetched_data} />
      </section>
    </>
  );
}
