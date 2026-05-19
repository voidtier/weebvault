import Card from "../../../../components/cards/Card.jsx";

export default function Anime_preview_card_grid({ card_data }) {
  if (card_data.lenth === 0) {
    return (
      <>
        <h1 className="text-4xl text-gray-300">wait</h1>
      </>
    );
  }
  return (
    <>
      <div className="flex justify-center flex-wrap gap-2.5">
        {card_data.map((card) => {
          return (
            <Card
              className="grayscale-100 hover:grayscale-0 cursor-pointer"
              key={card.mal_id}
              id={card.mal_id}
              image_src={card.images.webp.large_image_url}
            />
          );
        })}
      </div>
    </>
  );
}
