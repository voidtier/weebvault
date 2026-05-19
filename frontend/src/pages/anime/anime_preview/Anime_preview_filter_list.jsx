export default function Anime_preview_filter_list() {
  return (
    <>
      <div className="flex gap-x-5 py-2 border-b border-gray-700 mb-5">
        <div className="text-sm px-2 py-1.5 cursor-pointer rounded-2xl border border-gray-700 hover:bg-gray-700 duration-300">
          <p>Airing</p>
        </div>
        <div className="text-sm px-2 py-1.5 cursor-pointer rounded-2xl border border-gray-700 hover:bg-gray-700 duration-300">
          <p>Finished</p>
        </div>
        <div className="text-sm px-2 py-1.5 cursor-pointer rounded-2xl border border-gray-700 hover:bg-gray-700 duration-300">
          <p>Upcoming</p>
        </div>
      </div>
    </>
  );
}
