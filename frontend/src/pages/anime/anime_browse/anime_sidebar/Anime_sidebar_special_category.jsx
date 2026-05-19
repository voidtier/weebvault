import { useState } from "react";

export default function Anime_sidebar_special_category({ special_category }) {
  const [special_filter, set_special_filter] = useState([
    "Trending",
    "Top",
    "Favorite",
    "Movie",
    "Tv",
    "OVA",
    "Specials",
    "Ona",
    "Music",
    "Airing",
    "Finished",
    "Upcoming",
  ]);

  return (
    <>
      <div className=" text-gray-500 my-2.5">
        {special_filter.map((sc, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                special_category({
                  fetch_id: "",
                  fetch_category: "special",
                  special_name: sc.toLowerCase().trim(),
                });
              }}
              className="text-[14px] border-b border-gray-700 hover:bg-gray-600 duration-200"
            >
              <p className="w-full p-1">{sc.toLowerCase().trim()}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
