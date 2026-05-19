export default function Anime_strongest_image_component({
  strongest_image_data,
}) {
  return (
    <>
      <div
        id="anime_strongest_image_wrapper"
        className="max-h-64 w-full mx-3 my-5 rounded-xl overflow-hidden duration-300"
      >
        <img
          src={strongest_image_data.webp.large_image_url}
          className="w-full h-full object-contain"
        />
      </div>
    </>
  );
}
