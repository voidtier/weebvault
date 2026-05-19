import Anime_preview from "./anime_preview/Anime_preview";
import Anime_sidebar from "./anime_sidebar/Anime_sidebar";

export default function Anime_rest() {
  return (
    <>
      <section className="w-full min-h-screen flex">
        <Anime_sidebar />
        <Anime_preview />
      </section>
    </>
  );
}
