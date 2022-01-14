import React from "react";
import RMTable from "../RMTable";
import Router from "next/router";
import axios from "axios";
import useCharacters from "../../hooks/useCharacters";
import { ActionContext } from "../../context/ActionContext";
import { LocationsItem } from "../../model/locationsModel";
import TableSkeletons from "../skeletons/TableSkeletons";
import { ColumnCfg } from "../../model/columnCfgModel";
import { ResponseData } from "../../model/ResponseDataModel";
import { PaginationModel } from "../../model/paginationModel";

type LocationsProps = {
  locations: LocationsItem[];
  setData: (data: ResponseData<LocationsItem>) => void;
  pagesInfo: PaginationModel;
};

const LocationList = ({ locations, setData, pagesInfo }: LocationsProps) => {
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
    setData({
      results: mappedLocations.filter((x) => x.id !== id),
      info: pagesInfo,
    });
    const response = await axios.delete(
      `/api/locations/${encodeURIComponent(id)}`
    );
  }

  return locations.length ? (
    <ActionContext.Provider value={{ handleUpdate, handleDelete }}>
      <RMTable tableData={mappedLocations} columnConfig={locationsColumns} />
    </ActionContext.Provider>
  ) : (
    <TableSkeletons amount={10} pageColumns={locationsColumns} />
  );
};

export default LocationList;
