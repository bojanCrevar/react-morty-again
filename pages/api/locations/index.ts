import locationsRepo from "../../../utils/locations-repo";
import { NextApiRequest, NextApiResponse } from "next";
import { filterConfig } from "../../locations";
import {
  prepareItems,
  buildInfoPage,
  returnResult,
  createObject,
} from "../../../utils/apiResponse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      {
        const { numberOfItems, preparedItems } = prepareItems(
          locationsRepo.getAll(),
          req.query,
          filterConfig
        );

        const infoPage = buildInfoPage(numberOfItems);

        returnResult(infoPage, preparedItems, res);
      }
      break;

    case "POST":
      {
        const insertObj = createObject(req.body, locationsRepo.getAll());
        locationsRepo.create(insertObj);
        res.status(200).json("success");
      }
      break;

    default:
      break;
  }
}
