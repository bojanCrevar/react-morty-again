import { NextApiRequest, NextApiResponse } from "next";
import { EpisodeItem } from "../../../model/episodeModel";
import episodesRepo from "../../../utils/episode-repo";

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
        const episodes: EpisodeItem[] = episodesRepo.getAll();

        const foundItem = episodes.find(
          (episode: EpisodeItem) => episode!.episode == episodeFromQuery
        );

        res.status(200).json({
          exists: !!foundItem,
        });
      }
      break;
  }
}
