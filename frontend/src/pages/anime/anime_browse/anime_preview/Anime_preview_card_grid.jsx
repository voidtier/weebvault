import Card from "../../../../components/cards/Card.jsx";

export default function Anime_preview_card_grid({ fetched_data }) {
  return (
    <>
      <div className="flex justify-center flex-wrap gap-2.5">
        {fetched_data.map((card) => {
          return (
            <Card
              className="grayscale-100 hover:grayscale-0 cursor-pointer"
              id={card.mal_id}
              image_src={card.images.webp.large_image_url}
            />
          );
        })}
      </div>
    </>
  );
}
