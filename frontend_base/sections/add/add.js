const searchToAdd = document.querySelector(".searchToAdd");
const manuallyAdd = document.querySelector(".manuallyAdd");

async function getjikandata(type, name) {
  try {
    let url = `https://api.jikan.moe/v4/${type}?q=${name}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`could fetch data`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`error while fetching data from jikan api :${error}`);
  }
}

searchToAdd.addEventListener("click", async () => {
  const titleOnSearch = document.querySelector(".titleOnSearch");
  const categoryOnSearch = document.querySelector(".categoryOnSearch");
  const name = titleOnSearch.value;
  const type = categoryOnSearch.value;
  const prnt = await getjikandata(type, name);
  console.log(prnt);
});

manuallyAdd.addEventListener("click", () => {
  const manualWrapper = document.querySelector(".manualWrapper");
  manualWrapper.style.display = "flex";
  const submitOnManual = document.querySelector(".submitOnManual");
  submitOnManual.addEventListener("click", () => {
    manualWrapper.style.display = "none";
  });
});
