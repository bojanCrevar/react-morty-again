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
    //item (ie. locations, characters, episodes)
    for (const filterKey in filterValues) {
      //filter key (ie. 'geneder')
      const filterValue = filterValues[filterKey];
      for (const value in filterValue) {
        //filter value (ie. 'male')
        if (item[filterKey].includes(filterValue[value])) {
          return true;
        }
      }
    }
  });
}
