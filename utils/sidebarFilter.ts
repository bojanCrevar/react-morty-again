import {
  filterConfig,
  FILTER_CONFIG_COMPARISON_COUNT,
  FILTER_CONFIG_EXACT,
} from "../pages/episodes";

interface FilterValues {
  [key: string]: string[];
}

function setupFilterValues(
  query: { [key: string]: string | string[] },
  keyword?: string
) {
  let filterValues: FilterValues = {};
  for (var key in query) {
    if (key.includes("filter.") && typeof key === "string") {
      var filterKey = key.substring(key.indexOf(".") + 1).replace("[]", "");

      //select one filter value
      if (typeof query[key] == "string") {
        filterValues[filterKey] = [query[key]] as string[];
      } else {
        filterValues[filterKey] = query[key] as string[];
      }
    }
  }

  if (keyword) {
    filterValues["name"] = [keyword];
  }

  return filterValues;
}

export default function filter(
  allItems: any[],
  query: {
    [key: string]: string | string[];
  }
) {
  const filterValues = setupFilterValues(query);

  if (Object.keys(filterValues).length === 0) {
    return allItems;
  }

  return allItems.filter((item: { [prop: string]: any }) => {
    //allItems = (ie. locations, characters, episodes)
    let results: any = [];

    for (const filterKey in filterValues) {
      let operatorType = filterConfig.find(
        (filter) => filter.key === filterKey
      )?.operatorType;

      results[filterKey] = [];

      //filterKey = (ie. 'geneder, characters')
      const filterValue = filterValues[filterKey];
      for (const value in filterValue) {
        const criteria = filterValue[value]; //15-30

        if (operatorType === FILTER_CONFIG_COMPARISON_COUNT) {
          //filter value (ie. 'male')
          let filterKeyCount = item[filterKey].length; // length
          // console.log("criteria", criteria);

          if (criteria.includes("-")) {
            let criteriaArray = criteria.split("-");
            let min = criteriaArray[0];
            let max = criteriaArray[1];
            if (filterKeyCount >= min && filterKeyCount <= max) {
              // console.log("filterKeyCount min max", filterKeyCount);
              results[filterKey].push({ [`${criteria}`]: true });
            } else {
              results[filterKey].push({ [`${criteria}`]: false });
            }
          } else if (criteria.includes(">")) {
            let operator = criteria[0].charAt(0);
            let operatorValue = criteria.split(">")[1];
            if (operator === ">") {
              if (filterKeyCount > operatorValue) {
                // console.log("filterKeyCount greater than", filterKeyCount);
                results[filterKey].push({ [`${criteria}`]: true });
              } else {
                results[filterKey].push({ [`${criteria}`]: false });
              }
            }
          }
        } else if (operatorType === FILTER_CONFIG_EXACT) {
          if (item[filterKey].includes(filterValue[value])) {
            // console.log("exact filter ", filterValue[value]);
            results[filterKey].push({ [`${criteria}`]: true });
          } else {
            results[filterKey].push({ [`${criteria}`]: false });
          }
        }

        console.log("results", results);

        for (const result in results) {
          if (!results[result]) {
            return false;
          }
        }
      }
    }

    return true;
  });
}
