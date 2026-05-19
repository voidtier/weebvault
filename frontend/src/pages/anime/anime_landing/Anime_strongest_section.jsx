import Anime_strongest_image_component from "./Anime_strongest_image_component";
import Anime_strongest_details_component from "./Anime_strongest_details_component";
// import { useEffect, useState } from "react";

export default function Anime_strongest_section({ strongest_data }) {
  if (strongest_data.length === 0) {
    return (
      <>
        <h1 className="text-5xl text-gray-200">Sorry Could load</h1>
      </>
    );
  }
  return (
    <>
      <section
        id="anime_strongest_section"
        className="w-3/5 flex items-center border-r border-red-700"
      >
        <Anime_strongest_image_component
          strongest_image_data={strongest_data.images}
        />
        <Anime_strongest_details_component
          Anime_strongest_details_data={strongest_data}
        />
      </section>
    </>
  );
}
