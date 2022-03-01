import { FilterGroupConfig } from "../model/filterModel";
import { RMItem } from "../model/RMItem";
import { ParsedUrlQuery } from 'querystring';

export const FILTER_CONFIG_COMPARISON_COUNT = "comparison.count";
export const FILTER_CONFIG_EXACT = "exact";
interface FilterValues {
  [key: string]: string[];
}

type Item = { [prop: string]: any };

export function setupFilterValues(query: ParsedUrlQuery, withKeyword: boolean = true) {
  let filterValues: FilterValues = {};
  for (let key in query) {
    if (key.includes("filter.") && typeof key === "string") {
      const filterKey = key.substring(key.indexOf(".") + 1).replace("[]", "");

      //select one filter value
      if (typeof query[key] == "string") {
        filterValues[filterKey] = [query[key]] as string[];
      } else {
        filterValues[filterKey] = query[key] as string[];
      }
    }
  }

  const keyword = query.keyword;

  if (keyword && withKeyword) {
    filterValues["name"] = [keyword as string];
  }

  return filterValues;
}

export default function filter(
  allItems: RMItem[],
  query: {
    [key: string]: string | string[];
  },
  filterConfig: FilterGroupConfig[]
): RMItem[] {
  const filterValues = setupFilterValues(query);

  if (Object.keys(filterValues).length === 0) {
    return allItems;
  }

  return allItems.filter((item: Item) => {
    //allItems = (ie. locations, characters, episodes)
    let itemFilteredByKey: { [key: string]: boolean } = {};

    for (const key in filterValues) {
      let operatorType =
        filterConfig.find((f) => f.key === key)?.operatorType ??
        FILTER_CONFIG_EXACT;

      itemFilteredByKey[key] = false;

      // key = (ie. 'geneder, characters')
      // filterValue = ['15-30', '<30']
      const filterValue = filterValues[key];
      filterValue.forEach((criteria) => {
        if (itemFilteredByKey[key]) {
          return;
        }
        if (operatorType === FILTER_CONFIG_COMPARISON_COUNT) {
          let itemCount = item[key].length; // length

          if (criteria.includes("-")) {
            itemFilteredByKey[key] = range(criteria, itemCount);
          } else if (criteria.includes(">")) {
            itemFilteredByKey[key] = greaterThan(criteria, itemCount);
          }
        } else if (operatorType === FILTER_CONFIG_EXACT) {
          itemFilteredByKey[key] = item[key]
            .toLowerCase()
            .includes(criteria.toLowerCase());
        }
      });
    }

    return !Object.values(itemFilteredByKey).includes(false);
  });
}

function greaterThan(criteria: string, filterKeyCount: number) {
  let operator = criteria[0].charAt(0);
  let operatorValue = +criteria.split(">")[1];
  if (operator === ">") {
    if (filterKeyCount > operatorValue) {
      // console.log("filterKeyCount greater than", filterKeyCount);
      return true;
    }
  }

  return false;
}

function range(criteria: string, filterKeyCount: number) {
  let criteriaArray = criteria.split("-");
  let min = +criteriaArray[0];
  let max = +criteriaArray[1];
  return filterKeyCount >= min && filterKeyCount <= max;


}
