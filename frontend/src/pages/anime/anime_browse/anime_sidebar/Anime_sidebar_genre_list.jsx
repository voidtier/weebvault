import { useEffect, useState } from "react";

export default function Anime_sidebar_genre_list({ genre_category }) {
  const [genre, set_genre] = useState([]);

  useEffect(() => {
    async function genre_fetch() {
      try {
        const response = await fetch(`http://localhost:4000/api/anime/genre`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data);
        set_genre(data);
      } catch (error) {
        console.log(`error  : ${error}`);
      }
    }
    genre_fetch();
  }, []);

  if (genre.length === 0) {
    return (
      <>
        <h1 className="text-5xl text-gray-200">Sorry Could load</h1>
      </>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 p-2">
      {genre.map((gen) => (
        <div
          key={gen.genre_id}
          id={gen.genre_id}
          onClick={() => {
            genre_category({
              fetch_id: gen.genre_id,
              fetch_category: "genre",
              special_name: "",
            });
          }}
          className="
            px-2.5 py-1
            rounded-full
            border border-gray-700
            text-sm
            text-gray-300
            bg-gray-900
            hover:bg-gray-800
            cursor-pointer
            transition
            w-fit
          "
        >
          {gen.genre_name}
        </div>
      ))}
    </div>
  );
}
