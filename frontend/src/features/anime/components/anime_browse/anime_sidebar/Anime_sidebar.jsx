import Anime_sidebar_genre_list from "./Anime_sidebar_genre_list";
import Anime_sidebar_special_category from "./Anime_sidebar_special_category";
import { useState } from "react";

export default function Anime_sidebar({ change_category }) {
  const [active_type, set_active_type] = useState("special");
  return (
    <>
      <section className="max-w-[15%]">
        <Anime_sidebar_special_category
          active_checking={active_type}
          change_active_type={set_active_type}
          special_category={change_category}
        />
        <Anime_sidebar_genre_list
          active_checking={active_type}
          change_active_type={set_active_type}
          genre_category={change_category}
        />
      </section>
    </>
  );
}
