import Anime_sidebar_genre_list from "./Anime_sidebar_genre_list";
import Anime_sidebar_special_category from "./Anime_sidebar_special_category";

export default function Anime_sidebar() {
  return (
    <>
      <section className="max-w-[15%]">
        <Anime_sidebar_special_category />
        <Anime_sidebar_genre_list />
      </section>
    </>
  );
}
