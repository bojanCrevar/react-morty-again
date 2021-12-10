import React, { useEffect } from "react";
import RMTable from "./RMTable";
import Router from "next/router";
import axios from "axios";

const LocationList = ({ locations, fetchData }) => {
  const locationscolumns = [
    { key: "name", title: "Name" },
    { key: "dimension", title: "Dimension" },
    { key: "type", title: "Type" },
  ];

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
    <div className="text-center mt-4">
      <RMTable
        tabledata={locations}
        columnconfig={locationscolumns}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default LocationList;
