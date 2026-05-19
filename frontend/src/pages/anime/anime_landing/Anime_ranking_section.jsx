import Anime_ranking_card from "./Anime_ranking_card";

export default function Anime_ranking_section({ ranking_data }) {
  if (ranking_data.length === 0) {
    return (
      <>
        <h1 className="text-5xl text-gray-200">Sorry Could load</h1>
      </>
    );
  }
  return (
    <>
      <section
        id="anime_ranking_section"
        className="w-2/5 h-[45vh] overflow-hidden overflow-y-auto scroll-smooth snap-start"
      >
        {ranking_data.map((ani) => {
          return (
            <Anime_ranking_card key={ani.mal_id} ranking_card_data={ani} />
          );
        })}
      </section>
    </>
  );
}
