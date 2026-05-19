import { useEffect } from "react";
import Anime_landing_section from "./anime_landing/Anime_landing_page";
import Anime_browse_page from "./anime_browse/Anime_browse_page.jsx";
function Anime() {
  useEffect(() => {
    async function fetch_data() {
      try {
        const response = await fetch(`http://localhost:4000/api/anime/genre`);
        if (!response.ok) {
          throw new Error("couldn't fetch from /api/anime/genre");
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetch_data();
  });
  return (
    <>
      <section className="w-full min-h-screen bg-mist-950" id="anime">
        <Anime_landing_section />
        <Anime_browse_page />
      </section>
    </>
  );
}

export default Anime;
