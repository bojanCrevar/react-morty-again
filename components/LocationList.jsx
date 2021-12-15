import React from "react";
import RMTable from "./RMTable";
import Router from "next/router";
import axios from "axios";
import useCharacters from "../hooks/useCharacters";

const LocationList = ({ locations, fetchData }) => {
  const locationscolumns = [
    { key: "name", title: "Name" },
    { key: "dimension", title: "Dimension" },
    { key: "type", title: "Type" },
    {
      key: "charactersString",
      title: "Residents",
      tooltip: "charactersTooltip",
    },
  ];

  const mappedLocations = useCharacters(locations, "residents");

  function handleUpdate(id) {
    Router.push("locations/edit/" + id);
  }
  async function handleDelete(id) {
    const response = await axios.delete(
      `/api/locations/${encodeURIComponent(id)}`
    );

    if (response.status === 200) {
      fetchData();
    }
  }

  return (
    <div className="mt-4">
      <RMTable
        tabledata={mappedLocations}
        columnconfig={locationscolumns}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default LocationList;
