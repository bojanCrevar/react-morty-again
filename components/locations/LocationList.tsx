import React from "react";
import RMTable from "../RMTable";
import Router from "next/router";
import axios from "axios";
import useCharacters from "../../hooks/useCharacters";
import { ActionContext } from "../../context/ActionContext";
import { LocationsItem } from "../../model/locationsModel";
import TableSkeletons from "../skeletons/TableSkeletons";
import { ColumnCfg } from "../../model/columnCfgModel";

type LocationsProps = {
  locations: LocationsItem[];
  fetchData?: () => void;
};

const LocationList = ({ locations, fetchData }: LocationsProps) => {
  const locationsColumns: ColumnCfg<LocationsItem>[] = [
    { key: "name", title: "Name" },
    { key: "dimension", title: "Dimension" },
    { key: "type", title: "Type" },
    {
      key: "charactersString",
      title: "Residents",
      tooltip: "charactersTooltip",
    },
  ];

  const mappedLocations = useCharacters(locations);
  function handleUpdate(id: number) {
    Router.push("locations/edit/" + id);
  }
  async function handleDelete(id: number) {
    const response = await axios.delete(
      `/api/locations/${encodeURIComponent(id)}`
    );

    if (response.status === 200) {
      //fetchData();
    }
  }

  return locations.length ? (
    <div>
      <ActionContext.Provider value={{ handleUpdate, handleDelete }}>
        <RMTable tableData={mappedLocations} columnConfig={locationsColumns} />
      </ActionContext.Provider>
    </div>
  ) : (
    <TableSkeletons amount={10} pageColumns={locationsColumns} />
  );
};

export default LocationList;
