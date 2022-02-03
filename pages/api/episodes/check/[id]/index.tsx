import episodesRepo from "../../../../../utils/episode-repo";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      {
        let { episode } = req.query;
        let contains = false;

        for (let item of episodesRepo.getAll()) {
          if (item.episode === episode) {
            let contains = true;
            break;
          }
        }

        res.status(200).json({
          contains: contains,
        });
      }
      break;
  }
}
