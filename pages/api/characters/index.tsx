import characterRepo from "../../../utils/character-repo";
import { NextApiRequest, NextApiResponse } from "next";
import { filterConfig } from "../../characters/index";
import filter from "../../../utils/sidebarFilter";

//const rmAPI = "https://rickandmortyapi.com/api/character";
export const PAGE_SIZE = 20;
const rickChar = characterRepo.getAll()[0];

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

        let allChars = characterRepo.getAll();

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
          const charsFiltered = filter(allChars, req.query, filterConfig);

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
          ...body,
          id: characterRepo.getAll().reduce((a, b) => Math.max(a, b.id), 0) + 1,
        };
        characterRepo.create(insertObj);
        res.status(200).json("success");
      }
      break;
  }
}
