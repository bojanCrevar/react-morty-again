import episodesRepo from "../../../utils/episodes-repo";
import { NextApiRequest, NextApiResponse } from "next";

const PAGE_SIZE = 20;

type episodeProps = {
  activePage: number;
  keyword: string;
  sort: string;
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
          activePage = 1,
          keyword = "",
          sort = "",
        }: episodeProps = req.query;
        keyword = keyword.toLowerCase();

        const allEpisodes = episodesRepo.getAll();
        const episodesFiltered = keyword
          ? allEpisodes.filter((ch) => ch.name.toLowerCase().includes(keyword))
          : allEpisodes;

        const episodesSorted =
          sort === "id"
            ? episodesFiltered.sort((a, b) => {
                return a.id - b.id;
              })
            : episodesFiltered.sort((a, b) => {
                const isReversed = sort === "asc" ? 1 : -1;
                return isReversed * a.name.localeCompare(b.name);
              });

        let startIndex = (activePage - 1) * PAGE_SIZE;
        let endIndex = Math.min(startIndex + PAGE_SIZE, episodesSorted.length);

        const episodesPaginated = episodesSorted.slice(startIndex, endIndex);

        const infoPage = {
          count: episodesSorted.length,
          pages: Math.ceil(episodesSorted.length / PAGE_SIZE),
        };

        res.status(200).json({
          info: infoPage,
          results: episodesPaginated,
        });
      }
      break;
    case "POST":
      {
        const body = req.body;
        const insertObj = {
          id: episodesRepo.getAll().length + 1,
          ...body,
        };
        episodesRepo.create(insertObj);

        res.status(200).json("success");
      }
      break;
  }
}
