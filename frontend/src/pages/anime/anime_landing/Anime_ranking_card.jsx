export default function Anime_ranking_card({ ranking_card_data }) {
  function formatNumber(num) {
    if (!num) return "0";

    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "b";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "m";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return num.toString();
  }
  return (
    <>
      <div id="anime_ranking_list" className="flex flex-col">
        <div
          id="ranked_anime"
          className="flex justify-center pl-2 items-center border-b border-gray-600 hover:bg-mist-800 duration-300 cursor-pointer"
        >
          <div id="ranked_anime_rank_wrapper">
            <p
              id="ranked_anime_rank"
              className="text-5xl text-red-700 opacity-60"
            >
              {ranking_card_data.rank}
            </p>
          </div>
          <div
            id="ranked_anime_image_wrapper"
            className="h-28 max-w-max rounded-2xl overflow-hidden mx-2 my-2.5"
          >
            <img
              src={ranking_card_data.images.webp.large_image_url}
              id="ranked_anime_image"
              className="w-full h-full object-contain"
            />
          </div>
          <div id="ranked_anime_info" className=" ">
            <p id="ranked_anime_title" className="text-2xl text-red-700">
              {ranking_card_data.title}
            </p>
            <div id="ranked_anime_details" className="flex gap-x-1.5">
              <p
                id="ranked_anime_type"
                className="text-xs text-gray-400 pr-2 border-r border-red-700"
              >
                {ranking_card_data.type}
              </p>
              <p
                id="ranked_anime_status"
                className="text-xs text-gray-400 pr-2 border-r border-red-700"
              >
                {ranking_card_data.status}
              </p>
              <p
                id="ranked_anime_fav"
                className="text-xs text-gray-400 pr-2 border-r border-red-700"
              >
                {formatNumber(ranking_card_data.favorites)}
              </p>
            </div>
          </div>
          <div id="ranked_anime_score_wrapper" className="mx-2.5 ml-auto">
            <p
              id="ranked_anime_score"
              className="text-lg text-red-700 py-2.5 px-5 border border-gray-900 rounded-3xl"
            >
              {ranking_card_data.score}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
