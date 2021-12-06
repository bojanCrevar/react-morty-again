import episodesRepo from "../../../utils/episodes-repo";

const PAGE_SIZE = 20;

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      {
        let { activePage = 1, keyword = "" } = req.query;
        keyword = keyword.toLowerCase();
        const allEpisodes = episodesRepo.getAll();
        const episodesFiltered = keyword
          ? allEpisodes.filter((ch) => ch.name.toLowerCase().includes(keyword))
          : allEpisodes;

        let startIndex = (activePage - 1) * PAGE_SIZE;
        let endIndex = Math.min(
          startIndex + PAGE_SIZE,
          episodesFiltered.length
        );

        const episodesPaginated = episodesFiltered.slice(startIndex, endIndex);

        const infoPage = {
          count: episodesFiltered.length,
          pages: episodesFiltered.length / PAGE_SIZE,
        };

        res.status(200).json({
          info: infoPage,
          results: episodesPaginated,
        });
      }
      break;
  }
}
