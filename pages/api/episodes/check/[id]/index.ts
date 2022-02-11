import episodesRepo from "../../../../../utils/episode-repo";
import { NextApiRequest, NextApiResponse } from "next";
import { EpisodeItem } from "../../../../../model/episodeModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      {
        let { episode: episodeFromQuery } = req.query;
        if (!episodeFromQuery) {
          res.status(404).json({ error: "No episode!" });
        }
        const episodes = episodesRepo.getAll();

        episodes.find((episode) => {
          if (episode!.episode == episodeFromQuery) {
            res.status(200).json({
              contains: true,
            });
          }
        });
        episodes;
        res.status(200).json({
          contains: false,
        });
      }
      break;
  }
}
