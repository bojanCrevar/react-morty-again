import episodesRepo from "../../../utils/episode-repo";
import { NextApiRequest, NextApiResponse } from "next";
import { filterConfig } from "../../episodes";
import {
  buildInfoPage,
  createObject,
  prepareItems,
  returnResult,
} from "../../../utils/apiResponse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    default:
    case "GET":
      {
        const { numberOfItems, preparedItems } = prepareItems(
          episodesRepo.getAll(),
          req.query,
          filterConfig
        );
        const infoPage = buildInfoPage(numberOfItems);

        returnResult(infoPage, preparedItems, res);
      }
      break;
    case "POST":
      {
        const insertObj = createObject(req.body, episodesRepo.getAll());
        episodesRepo.create(insertObj);
        res.status(200).json("success");
      }
      break;
  }
}
