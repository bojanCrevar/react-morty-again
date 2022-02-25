import React from "react";

type SortCOmponentParams = { setSort: (e: string) => void; initSort: string };

//destructure and set type
const SortComponent = ({ setSort, initSort }: SortCOmponentParams) => {
  return (
    <div className="w-full">
      <label className="w-1/3 text-right pr-2 lg:w-1/4">Sort by: </label>
      <select
        onChange={(e) => setSort(e.target.value)}
        className="rounded w-2/5 text-left text-base ml-1 p-1 bg-gray-300 dark:bg-[#6F737B] lg:w-3/4 lg:ml-0"
        defaultValue={initSort}
        data-testid="select"
      >
        <option data-testid="id" value="id">
          ID
        </option>
        <option data-testid="asc" value="asc">
          Name ascending
        </option>
        <option value="desc">Name descending</option>
      </select>
    </div>
  );
};

export default SortComponent;
