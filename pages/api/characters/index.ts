import characterRepo from "../../../utils/character-repo";
import { NextApiRequest, NextApiResponse } from "next";
import { filterConfig } from "../../characters/index";

import {
  buildInfoPage,
  createObject,
  prepareItems,
  returnResult,
} from "../../../utils/apiResponse";

const rickChar = characterRepo.getAll()[0];

function generateDummyChar(charId: string) {
  return {
    ...rickChar,
    id: charId,
    name: "Dummy Rick " + charId,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    default:
    case "GET":
      {
        let allChars = characterRepo.getAll();
        const { characters } = req.query as { characters?: string };
        if (characters) {
          const characterIds = characters.split(",");

          const mappedChars = characterIds
            .map((charId) => {
              const foundChar = allChars.find(
                (x) => x.id.toString() === charId.toString()
              );
              return foundChar ?? generateDummyChar(charId);
            })
            .filter((c) => c);

          res.status(200).json({
            characters: mappedChars,
          });
        } else {
          const { numberOfItems, preparedItems } = prepareItems(
            characterRepo.getAll(),
            req.query,
            filterConfig
          );
          const infoPage = buildInfoPage(numberOfItems);

          returnResult(infoPage, preparedItems, res);
        }
      }
      break;
    case "POST":
      {
        const insertObj = createObject(req.body, characterRepo.getAll());
        characterRepo.create(insertObj);
        res.status(200).json("success");
      }
      break;
  }
}
