import myCharactersRepo from "../../../utils/character-repo";
import { NextApiRequest, NextApiResponse } from "next";

//const rmAPI = "https://rickandmortyapi.com/api/character";
const PAGE_SIZE = 20;
const rickChar = myCharactersRepo.getAll()[0];

function generateDummyChar(charId: string) {
  return {
    ...rickChar,
    id: charId,
    name: "Dummy Rick " + charId,
  };
}

type charactersProps = {
  activePage: string;
  keyword: string;
  characters?: string;
  sort: string;
  filterObject: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    default:
    case "GET":
      {
        let {
          activePage = "1",
          keyword = "",
          characters,
          sort = "",
          filterObject = "",
        }: charactersProps = req.query as charactersProps;

        //console.log("req.query", req.query);

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

          const charsSorted =
            sort === "id"
              ? charsFiltered.sort((a, b) => {
                  return a.id - b.id;
                })
              : charsFiltered.sort((a, b) => {
                  const isReversed = sort === "asc" ? 1 : -1;
                  return isReversed * a.name.localeCompare(b.name);
                });

          let startIndex = (+activePage - 1) * PAGE_SIZE;
          let endIndex = Math.min(startIndex + PAGE_SIZE, charsSorted.length);

          const charsPaginated = charsSorted.slice(startIndex, endIndex);

          const infoPage = {
            count: charsSorted.length,
            pages: Math.ceil(charsSorted.length / PAGE_SIZE),
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
