import React, { Dispatch, SetStateAction } from "react";
import RMTable from "../RMTable";
import Router from "next/router";
import axios from "axios";
import useCharacters from "../../hooks/useCharacters";
import { ActionContext } from "../../context/ActionContext";
import { LocationsItem } from "../../model/locationsModel";
import TableSkeletons from "../skeletons/TableSkeletons";
import { ColumnCfg } from "../../model/columnCfgModel";
import { ResponseData } from "../../model/ResponseDataModel";
import Loader from "../Spinner";

type LocationsProps = {
  locations: LocationsItem[];
  setData: Dispatch<SetStateAction<ResponseData<LocationsItem>>>;
  skeleton: Boolean;
  loader: Boolean;
};

const LocationList = ({
  locations,
  setData,
  skeleton,
  loader,
}: LocationsProps) => {
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
  console.log("mappedLocations", mappedLocations);
  console.log("locations", locations);
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

  return (
    <>
      {skeleton && (
        <TableSkeletons amount={20} pageColumns={locationsColumns} />
      )}
      {loader ? (
        <Loader />
      ) : locations.length > 0 ? (
        <ActionContext.Provider value={{ handleUpdate, handleDelete }}>
          <RMTable
            tableData={mappedLocations}
            columnConfig={locationsColumns}
          />
        </ActionContext.Provider>
      ) : (
        <div className="mt-4 bg-white rounded p-3 text-lg text-center">
          No items found!
        </div>
      )}
    </>
  );
};

export default LocationList;
