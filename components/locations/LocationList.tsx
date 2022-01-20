import React, { Dispatch, SetStateAction } from "react";
import RMTable from "../RMTable";
import Router from "next/router";
import axios from "axios";
import useCharacters from "../../hooks/useCharacters";
import { ActionContext } from "../../context/ActionContext";
import { LocationsItem } from "../../model/locationsModel";
import { ColumnCfg } from "../../model/columnCfgModel";
import { ResponseData } from "../../model/ResponseDataModel";
import NoResults from "../NoResults";

type LocationsProps = {
  locations: LocationsItem[];
  setData: Dispatch<SetStateAction<ResponseData<LocationsItem>>>;
  locationsColumns: ColumnCfg<LocationsItem>[];
};

const LocationList = ({
  locations,
  setData,
  locationsColumns,
}: LocationsProps) => {
  const mappedLocations = useCharacters(locations);
  function handleUpdate(id: number) {
    Router.push("locations/edit/" + id);
  }
  async function handleDelete(id: number) {
    setData((prev) => ({
      ...prev,
      results: mappedLocations.filter((x) => x.id !== id),
    }));
    const response = await axios.delete(
      `/api/locations/${encodeURIComponent(id)}`
    );
  }

  return locations.length > 0 ? (
    <ActionContext.Provider value={{ handleUpdate, handleDelete }}>
      <RMTable tableData={mappedLocations} columnConfig={locationsColumns} />
    </ActionContext.Provider>
  ) : (
    <NoResults />
  );
};

export default LocationList;
