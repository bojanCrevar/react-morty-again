import characterRepo from "../../../utils/character-repo";
import { NextApiRequest, NextApiResponse } from "next";
import { filterConfig } from "../../characters/index";
import filter from "../../../utils/sidebarFilter";

import {
  buildInfoPage,
  createObject,
  prepareItems,
  returnResult,
} from "../../../utils/apiResponse";
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
        const { numberOfItems, preparedItems } = prepareItems(
          characterRepo.getAll(),
          req.query,
          filterConfig
        );
        const infoPage = buildInfoPage(numberOfItems);

        returnResult(infoPage, preparedItems, res);
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
