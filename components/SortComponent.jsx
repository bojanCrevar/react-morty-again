import React from "react";

const SortComponent = ({ setSort }) => {
  return (
    <div className="absolute right-0 bottom-0">
      <label for="sorting">Sort by: </label>{" "}
      <select
        id="sorting"
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
