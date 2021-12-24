import React from "react";

type SortCOmponentParams = { setSort: (e: string) => void };

//destructure and set type
const SortComponent = ({ setSort }: SortCOmponentParams) => {
  return (
    <div className="absolute right-0 bottom-0">
      <label>Sort by: </label>{" "}
      <select
        onChange={(e) => setSort(e.target.value)}
        className="w-auto rounded text-base p-1 bg-gray-300"
      >
        <option value="id">ID</option>
        <option value="asc">Name ascending</option>
        <option value="desc">Name descending</option>
      </select>
    </div>
  );
};

export default SortComponent;
