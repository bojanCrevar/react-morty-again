import React from "react";
import RMTable from "./RMTable";

const LocationList = ({ locations }) => {
  const locationscolumns = [
    { key: "name", title: "Name" },
    { key: "dimension", title: "Dimension" },
    { key: "type", title: "Type" },
  ];

  function handleUpdate(id) {
    alert(id);
  }

  return (
    <div className="text-center">
      <h5 className="p-4 text-4xl	text-center">List of Locations</h5>
      <RMTable
        tabledata={locations}
        columnconfig={locationscolumns}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default LocationList;
