import { NextApiResponse } from "next";
import { FilterGroupConfig } from "../model/filterModel";
import { RMItem } from "../model/RMItem";
import filter from "./sidebarFilter";

export const PAGE_SIZE = 20;

export type itemsParams = {
  activePage: string;
  sort: string;
};

export function prepareItems(
  allItems: RMItem[],
  requestQuery: {
    [key: string]: string | string[];
  },
  filterConfig: FilterGroupConfig[]
) {
  let { activePage = "1", sort = "" }: itemsParams =
    requestQuery as itemsParams;

  const itemsFiltered = filter(allItems, requestQuery, filterConfig);
  const itemsSorted = sortItems(sort, itemsFiltered);
  const itemsPaginated = paginateItems(activePage, itemsSorted);

  return itemsPaginated;
}

function paginateItems(activePage: string, itemsSorted: RMItem[]) {
  let startIndex = (+activePage - 1) * PAGE_SIZE;
  let endIndex = Math.min(startIndex + PAGE_SIZE, itemsSorted.length);

  const itemsPaginated = itemsSorted.slice(startIndex, endIndex);
  return itemsPaginated;
}

export function sortItems(sort: string, itemsFiltered: RMItem[]) {
  return sort === "id"
    ? itemsFiltered.sort((a, b) => {
        return a.id - b.id;
      })
    : itemsFiltered.sort((a, b) => {
        const isReversed = sort === "asc" ? 1 : -1;
        return isReversed * a.name.localeCompare(b.name);
      });
}

export function returnResult(
  infoPage: { count: number; pages: number },
  itemsPaginated: RMItem[],
  res: NextApiResponse
) {
  res.status(200).json({
    info: infoPage,
    results: itemsPaginated,
  });
}

export function buildInfoPage(itemsSorted: RMItem[]) {
  return {
    count: itemsSorted.length,
    pages: Math.ceil(itemsSorted.length / PAGE_SIZE),
  };
}
