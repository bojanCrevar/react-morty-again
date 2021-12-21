//import axios from "axios";
import locationsRepo from "../../../utils/locations-repo";

const PAGE_SIZE = 20;

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      {
        let { activePage = 1, keyword = "", sort = "" } = req.query;
        keyword = keyword.toLowerCase();

        const allLocations = locationsRepo.getAll();
        const locationsFiltered = keyword
          ? allLocations.filter((loc) =>
              loc.name.toLowerCase().includes(keyword)
            )
          : allLocations;

        const locationsSorted =
          sort === "id"
            ? locationsFiltered.sort((a, b) => {
                return a.id - b.id;
              })
            : locationsFiltered.sort((a, b) => {
                const isReversed = sort === "asc" ? 1 : -1;
                return isReversed * a.name.localeCompare(b.name);
              });

        let startIndex = (activePage - 1) * PAGE_SIZE;
        let endIndex = Math.min(startIndex + PAGE_SIZE, locationsSorted.length);

        const locationsPaginated = locationsSorted.slice(startIndex, endIndex);

        const infoPage = {
          count: locationsSorted.length,
          pages: Math.ceil(locationsSorted.length / PAGE_SIZE),
        };

        res.status(200).json({
          info: infoPage,
          results: locationsPaginated,
        });
      }
      break;

    case "POST":
      {
        const body = req.body;
        const insertObj = {
          id: locationsRepo.getAll().length + 1,
          ...body,
        };
        locationsRepo.create(insertObj);
        res.status(200).json("success");
      }
      break;

    default:
      break;
  }
}
