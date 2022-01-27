import locationsRepo from "../../../utils/locations-repo";
import { NextApiRequest, NextApiResponse } from "next";
import { filterConfig } from "../../locations";
import filter from "../../../utils/sidebarFilter";

const PAGE_SIZE = 20;

type locationProps = {
  activePage: string;
  sort: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      {
        let { activePage = "1", sort = "" }: locationProps =
          req.query as locationProps;

        const allLocations = locationsRepo.getAll();

        const locationsFiltered = filter(allLocations, req.query, filterConfig);

        const locationsSorted =
          sort === "id"
            ? locationsFiltered.sort((a, b) => {
                return a.id - b.id;
              })
            : locationsFiltered.sort((a, b) => {
                const isReversed = sort === "asc" ? 1 : -1;
                return isReversed * a.name.localeCompare(b.name);
              });

        let startIndex = (+activePage - 1) * PAGE_SIZE;
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
          id: locationsRepo.getAll().reduce((a, b) => Math.max(a, b.id), 0) + 1,
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
