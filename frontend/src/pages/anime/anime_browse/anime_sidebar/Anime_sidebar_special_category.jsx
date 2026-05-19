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
          <div
            key={index}
            onClick={() => {
              special_category.special_name = sc.toLowerCase().trim();
              special_category.fetch_category = "special";
            }}
            className="text-[14px] border-b border-gray-700 hover:bg-gray-600 duration-200"
          >
            <p className="w-full p-1">{sc.toLowerCase().trim()}</p>
          </div>;
        })}

        <div className="border-b border-gray-700 hover:bg-gray-600 duration-200">
          <p className="w-full p-1">Top</p>
        </div>
        <div className="border-b border-gray-700 hover:bg-gray-600 duration-200">
          <p className="w-full p-1">Favorite</p>
        </div>
        <div className="border-b border-gray-700 hover:bg-gray-600 duration-200">
          <p className="w-full p-1">Movie</p>
        </div>
        <div className="border-b border-gray-700 hover:bg-gray-600 duration-200">
          <p className="w-full p-1">Tv</p>
        </div>
        <div className="border-b border-gray-700 hover:bg-gray-600 duration-200">
          <p className="w-full p-1">OVA</p>
        </div>
        <div className="border-b border-gray-700 hover:bg-gray-600 duration-200">
          <p className="w-full p-1">Specials</p>
        </div>
        <div className="border-b border-gray-700 hover:bg-gray-600 duration-200">
          <p className="w-full p-1">Ona</p>
        </div>
        <div className="border-b border-gray-700 hover:bg-gray-600 duration-200">
          <p className="w-full p-1">Music</p>
        </div>
        <div className="border-b border-gray-700 hover:bg-gray-600 duration-200">
          <p className="w-full p-1">Airing</p>
        </div>
        <div className="border-b border-gray-700 hover:bg-gray-600 duration-200">
          <p className="w-full p-1">Finished</p>
        </div>
        <div className="border-b border-gray-700 hover:bg-gray-600 duration-200">
          <p className="w-full p-1">Upcoming</p>
        </div>
      </div>
    </>
  );
}
