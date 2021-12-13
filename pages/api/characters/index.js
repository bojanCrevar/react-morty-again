import myCharactersRepo from "../../../utils/character-repo";

//const rmAPI = "https://rickandmortyapi.com/api/character";
const PAGE_SIZE = 20;
const rickChar = myCharactersRepo.getAll()[0];

function generateDummyChar(charId) {
  return {
    ...rickChar,
    id: charId,
    name: "Dummy Rick " + charId,
  };
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      {
        let { activePage = 1, keyword = "", characters } = req.query;

        let allChars = myCharactersRepo.getAll();

        if (characters) {
          const characterIds = characters.split(",");

          const mappedChars = characterIds
            .map((charId) => {
              const foundChar = allChars.find(
                (x) => x.id.toString() === charId.toString()
              );
              return foundChar ? foundChar : generateDummyChar(charId);
            })
            .filter((c) => c);

          res.status(200).json({
            characters: mappedChars,
          });
        } else {
          keyword = keyword.toLowerCase();

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
      }
      break;
    case "POST":
      {
        const body = req.body;
        const insertObj = {
          id: myCharactersRepo.getAll().length + 1,
          ...body,
        };
        myCharactersRepo.create(insertObj);
        res.status(200).json("success");
      }
      break;
  }
}
