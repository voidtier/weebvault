import { useState } from "react";
import Anime_preview from "./anime_preview/Anime_preview";
import Anime_sidebar from "./anime_sidebar/Anime_sidebar";

export default function Anime_rest() {
  const [fetch_info, set_fetch_info] = useState({
    fetch_id: "",
    fetch_category: "genre",
    special_name: "",
  });

  return (
    <>
      <section className="w-full min-h-screen flex">
        <Anime_sidebar change_category={set_fetch_info} />
        <Anime_preview changed_category={fetch_info} />
      </section>
    </>
  );
}
