import React from "react";
import RMTable from "./RMTable";
import Router from "next/router";

const LocationList = ({ locations }) => {
  const locationscolumns = [
    { key: "name", title: "Name" },
    { key: "dimension", title: "Dimension" },
    { key: "type", title: "Type" },
  ];

  function handleUpdate(id) {
    //alert(id);
    Router.push("locations/edit/" + id);
  }

  return (
    <div className="text-center mt-4">
      <RMTable
        tabledata={locations}
        columnconfig={locationscolumns}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default LocationList;
