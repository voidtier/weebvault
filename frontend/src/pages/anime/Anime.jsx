import { useEffect } from "react";
import Anime_landing_section from "./anime_landing/Anime_landing_page";
import Anime_browse_page from "./anime_browse/Anime_browse_page.jsx";
function Anime() {
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
