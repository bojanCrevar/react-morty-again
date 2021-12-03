import myCharactersRepo from "../../utils/character-repo";

//const rmAPI = "https://rickandmortyapi.com/api/character";
const PAGE_SIZE = 20;

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      {
        let { activePage = 1, keyword = "" } = req.query;
        keyword = keyword.toLowerCase();
        const allChars = myCharactersRepo.getAll();
        const charsFiltered = keyword
          ? allChars.filter((ch) => ch.name.toLowerCase().includes(keyword))
          : allChars;

        let startIndex = (activePage - 1) * PAGE_SIZE;
        let endIndex = Math.min(startIndex + PAGE_SIZE, charsFiltered.length);

        const charsPaginated = charsFiltered.slice(startIndex, endIndex);

        const infoPage = {
          count: charsFiltered.length,
          pages: charsFiltered.length / PAGE_SIZE,
        };

        res.status(200).json({
          info: infoPage,
          results: charsPaginated,
        });
      }
      break;
  }
}
