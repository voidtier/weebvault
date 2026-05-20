export default function Anime_strongest_details_component({
  Anime_strongest_details_data,
}) {
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
      <div
        id="strongest_anime_details"
        className="mx-2.5 mb-5 flex flex-col gap-y-2.5 justify-end text-xs text-gray-500"
      >
        <div id="rank_wrapper" className="text-red-600 flex items-end">
          <span id="rank_symbol" className="text-2xl opacity-25">
            #
          </span>
          <p id="rank" className="text-6xl leading-none opacity-60">
            {Anime_strongest_details_data.rank}
          </p>
        </div>
        <div id="status_wrapper" className="flex items-center gap-x-1">
          {Anime_strongest_details_data.status === "Currently Airing" ? (
            <>
              <span
                id="status_signal"
                className="w-2 h-2 rounded-full bg-green-700 shadow shadow-green-600 animate-pulse "
              ></span>
              <p id="status"> {Anime_strongest_details_data.status}</p>
            </>
          ) : (
            <p id="status"> {Anime_strongest_details_data.status}</p>
          )}
        </div>
        <div id="title_wrapper">
          <p id="title" className="text-3xl text-red-800">
            {Anime_strongest_details_data.title}
          </p>
        </div>
        <div id="description_wrapper">
          <p id="description">{Anime_strongest_details_data.synopsis}</p>
        </div>

        <div id="strongest_anime_stats" className="flex">
          <div
            id="score_wrapper"
            className="mr-2.5 pr-2 border-r border-red-500"
          >
            <span id="score_symbol" className="">
              Score
            </span>
            <p id="score" className="text-lg text-red-700">
              {Anime_strongest_details_data.score}
            </p>
          </div>
          {Anime_strongest_details_data.episodes === null ? (
            <div
              id="ep_or_du_wrapper"
              className="mr-2.5 pr-2 border-r border-red-500"
            >
              <span id="ep_or_du_symbol">Duration</span>
              <p id="ep_or_du" className="text-lg text-red-700">
                {Anime_strongest_details_data.duration}
              </p>
            </div>
          ) : (
            <div
              id="ep_or_du_wrapper"
              className="mr-2.5 pr-2 border-r border-red-500"
            >
              <span id="ep_or_du_symbol">Episodes</span>
              <p id="ep_or_du" className="text-lg text-red-700">
                {Anime_strongest_details_data.episodes}
              </p>
            </div>
          )}
          <div id="fav_wrapper" className="mr-2.5 pr-2 border-r border-red-500">
            <span id="fav_symbol">Favorite</span>
            <p id="fav" className="text-lg text-red-700">
              {formatNumber(Anime_strongest_details_data.favorites)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
