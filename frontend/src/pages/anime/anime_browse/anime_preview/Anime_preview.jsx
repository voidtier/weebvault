import Anime_preview_card_grid from "./Anime_preview_card_grid";
import Anime_preview_filter_list from "./Anime_preview_filter_list";
import { useEffect, useState } from "react";
export default function Anime_preview({ changed_category }) {
  const [fetched_data, set_fetched_data] = useState([]);
  const [page_number, set_page_number] = useState(1);
  useEffect(() => {
    if (changed_category.fetch_category === "genre") {
      async function genre_fetch() {
        try {
          const response = await fetch(
            `http://localhost:4000/api/anime/genre/${changed_category.fetch_id}/${page_number}`,
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const { send_data } = await response.json();
          console.log(send_data);
          set_fetched_data(send_data);
        } catch (error) {
          console.log(`error  : ${error}`);
        }
      }
      genre_fetch();
    }
  }, [changed_category]);

  useEffect(() => {
    if (changed_category.fetch_category === "special") {
      async function genre_fetch() {
        try {
          const response = await fetch(
            `http://localhost:4000/api/anime/${changed_category.fetch_category}/${page_number}`,
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const { send_data } = await response.json();
          console.log(send_data);
          set_fetched_data(send_data);
        } catch (error) {
          console.log(`error  : ${error}`);
        }
      }
      genre_fetch();
    }
  }, [changed_category]);
  return (
    <>
      <section className="max-w-[85%] h-full p-5">
        <Anime_preview_filter_list />
        <Anime_preview_card_grid card_data={[fetched_data]} />
      </section>
    </>
  );
}
