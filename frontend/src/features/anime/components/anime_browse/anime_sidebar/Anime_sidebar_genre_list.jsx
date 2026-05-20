import { useEffect, useState } from "react";

export default function Anime_sidebar_genre_list({
  active_checking,
  change_active_type,
  genre_category,
}) {
  const [genre, set_genre] = useState([]);

  useEffect(() => {
    async function genre_fetch() {
      try {
        const response = await fetch(`http://localhost:4000/api/anime/genre`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { data } = await response.json();
        // console.log(data);
        set_genre(data);
      } catch (error) {
        console.log(`error  : ${error}`);
      }
    }
    genre_fetch();
  }, []);

  const [is_clicked, set_is_clicked] = useState();
  useEffect(() => {
    genre_category({
      fetch_id: is_clicked,
      fetch_category: "genre",
      special_name: "",
    });
  }, [is_clicked]);

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
            set_is_clicked(gen.genre_id);
            change_active_type("genre");
          }}
          className={`
            px-2.5 py-1
            rounded-full
            border border-gray-700
            text-sm
            text-gray-400
            bg-gray-900
            hover:bg-gray-800
            cursor-pointer
            transition
            duration-300
            w-fit
            ${
              active_checking === "genre" && is_clicked === gen.genre_id
                ? "bg-gray-600 text-gray-200 border-none shadow-[ 0 2px 12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)] shadow-gray-200"
                : "hover:bg-gray-800"
            }
            `}
        >
          {gen.genre_name}
        </div>
      ))}
    </div>
  );
}
