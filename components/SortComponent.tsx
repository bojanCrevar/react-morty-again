import React from "react";

type SortCOmponentParams = { setSort: (e: string) => void; initSort: string };

//destructure and set type
const SortComponent = ({ setSort, initSort }: SortCOmponentParams) => {
  return (
    <div className="absolute right-0 bottom-0">
      <label>Sort by: </label>{" "}
      <select
        onChange={(e) => setSort(e.target.value)}
        className="w-auto rounded text-base p-1 bg-gray-300"
        defaultValue={initSort}
      >
        <option value="id">ID</option>
        <option value="asc">Name ascending</option>
        <option value="desc">Name descending</option>
      </select>
    </div>
  );
};

export default SortComponent;
