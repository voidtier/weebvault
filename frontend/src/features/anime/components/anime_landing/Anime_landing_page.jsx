import Anime_strongest_section from "./Anime_strongest_section";
import Anime_ranking_section from "./Anime_ranking_section";
import { useState, useEffect } from "react";

export default function Anime_landing_section() {
  const [landing_data, set_landing_data] = useState([]);
  useEffect(() => {
    async function strongest_anime_fetch() {
      try {
        const response = await fetch(
          `http://localhost:4000/api/anime/trending`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { data } = await response.json();
        // console.log(data);
        set_landing_data(data);
        // console.log(data.data_array);
      } catch (error) {
        console.log(`error  : ${error}`);
      }
    }
    strongest_anime_fetch();
  }, []);

  if (landing_data.length === 0) {
    return (
      <>
        <h1 className="text-5xl text-gray-200">Sorry Could load</h1>
      </>
    );
  }

  return (
    <>
      <section
        id="anime_landing_section"
        className="flex w-full h-[45vh] px-2.5 border-b border-red-600"
      >
        <Anime_strongest_section strongest_data={landing_data[0]} />
        <Anime_ranking_section ranking_data={landing_data.slice(1, 10)} />
      </section>
    </>
  );
}
