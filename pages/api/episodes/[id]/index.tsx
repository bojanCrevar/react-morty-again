import episodesRepo from "../../../../utils/episode-repo";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      {
        let { id } = req.query;
        if (!id) {
          res.status(404).json({ error: "No episode!" });
        }
        const episode = episodesRepo.getById(id);
        res.status(200).json({
          episode: episode,
        });
      }
      break;
    case "PUT":
      {
        const body = req.body;
        episodesRepo.update(body);
        res.status(200).json("success");
      }
      break;
    case "DELETE":
      {
        let { id } = req.query;
        episodesRepo.delete(id);

        res.status(200).json("success");
      }
      break;
  }
}
