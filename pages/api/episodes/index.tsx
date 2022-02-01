import episodesRepo from "../../../utils/episodes-repo";
import { NextApiRequest, NextApiResponse } from "next";
import { filterConfig } from "../../episodes";
import {
  buildInfoPage,
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
        const { itemsSorted, itemsPaginated } = prepareItems(
          episodesRepo.getAll(),
          req.query,
          filterConfig
        );
        const infoPage = buildInfoPage(itemsSorted);

        returnResult(infoPage, itemsPaginated, res);
      }
      break;
    case "POST":
      {
        const body = req.body;
        const insertObj = {
          id: episodesRepo.getAll().reduce((a, b) => Math.max(a, b.id), 0) + 1,
          ...body,
        };
        episodesRepo.create(insertObj);
        res.status(200).json("success");
      }
      break;
  }
}
