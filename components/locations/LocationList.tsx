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
import { PAGE_SIZE } from "../../utils/apiResponse";

type LocationsProps = {
  locations: LocationsItem[];
  setData: Dispatch<SetStateAction<ResponseData<LocationsItem>>>;
  setLoader: Dispatch<SetStateAction<Boolean>>;
  locationsColumns: ColumnCfg<LocationsItem>[];
};

const LocationList = ({
  locations,
  setData,
  locationsColumns,
  setLoader,
}: LocationsProps) => {
  const mappedLocations = useCharacters(locations);
  function handleUpdate(id: number) {
    Router.push("locations/edit/" + id);
  }
  async function handleDelete(id: number) {
    const response = await axios.delete(
      `/api/locations/${encodeURIComponent(id)}`
    );
    if (response.status === 200) {
      setLoader(true);
      setData((prev) => ({
        ...prev,
        info: {
          count: prev.info.count - 1,
          pages:
            prev.info.count % PAGE_SIZE === 1
              ? prev.info.pages - 1
              : prev.info.pages,
        },
      }));
    }
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
