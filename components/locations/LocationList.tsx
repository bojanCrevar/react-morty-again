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
import { useSelector } from "react-redux";
import { RootState } from "../../model/storeModel";

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
  const token = useSelector((state: RootState) => state.auth.token);
  const mappedLocations = useCharacters(locations);
  function handleUpdate(id: string) {
    Router.push("locations/edit/" + id);
  }
  async function handleDelete(id: string) {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_NODE_URL}/locations/${encodeURIComponent(id)}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
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
