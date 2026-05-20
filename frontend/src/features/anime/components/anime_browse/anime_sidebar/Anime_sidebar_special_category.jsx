import { useEffect, useState } from "react";

export default function Anime_sidebar_special_category({
  special_category,
  active_checking,
  change_active_type,
}) {
  const [special_filter, set_special_filter] = useState([
    "Trending",
    "Top",
    "Favorite",
    "Movie",
    "Tv",
    "OVA",
    "Special",
    "Ona",
    "Music",
    "Airing",
    "Finished",
    "Upcoming",
  ]);

  const [is_clicked, set_is_clicked] = useState("trending");

  useEffect(() => {
    special_category({
      fetch_id: "",
      fetch_category: "special",
      special_name: is_clicked,
    });
  }, [is_clicked]);

  return (
    <>
      <div className=" text-gray-500 my-2.5">
        {special_filter.map((sc, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                set_is_clicked(sc.toLowerCase().trim());
                change_active_type("special");
              }}
              className={`text-[14px] border-b border-gray-700 hover:bg-gray-600 duration-200

              ${
                active_checking === "special" &&
                is_clicked === sc.toLowerCase().trim()
                  ? "bg-gray-600 text-gray-300"
                  : "hover:bg-gray-600"
              }`}
            >
              <p className="w-full p-1">{sc.toLowerCase().trim()}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
