import Anime_preview_card_grid from "./Anime_preview_card_grid";
import Anime_preview_filter_list from "./Anime_preview_filter_list";
export default function Anime_preview() {
  return (
    <>
      <section className="max-w-[85%] h-full p-5">
        <Anime_preview_filter_list />
        <Anime_preview_card_grid />
      </section>
    </>
  );
}
