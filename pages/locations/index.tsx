import React, { useState } from "react";
import LocationList from "../../components/locations/LocationList";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import { QueryParams } from "../../model/queryParams";
import { ResponseData } from "../../model/ResponseDataModel";
import PageWrapper from "../../components/PageWrapper";
import { FilterGroupConfig } from "../../model/filterModel";
import { LocationsItem } from "../../model/locationsModel";
import { emptyPagination } from "../../model/paginationModel";
import { RMItem } from "../../model/RMItem";
import Loader from "../../components/Spinner";
import TableSkeletons from "../../components/skeletons/TableSkeletons";
import { ColumnCfg } from "../../model/columnCfgModel";
import { FILTER_CONFIG_COMPARISON_COUNT } from "../../utils/sidebarFilter";
import { LoadersType } from "../../model/loaderModel";

export const filterConfig: FilterGroupConfig[] = [
  {
    title: "Dimension",
    values: ["Dimension C-137", "Replacement Dimension", "unknown"],
    type: "checkbox",
    key: "dimension",
  },
  {
    title: "Type",
    values: ["Planet", "Cluster", "Microverse", "Space station"],
    type: "checkbox",
    key: "type",
  },
  {
    title: "Residents count",
    values: ["0-15", "16-30", ">30"],
    type: "checkbox",
    key: "residents",
    operatorType: FILTER_CONFIG_COMPARISON_COUNT,
  },
];

const LocationsPage = ({ query }: { query: QueryParams }) => {
  const [loaders, setLoaders] = useState<LoadersType>({
    spinLoader: false,
    skeletonLoader: true,
  });
  const [data, setData] = useState<ResponseData<LocationsItem>>({
    info: emptyPagination,
    results: [],
  });
  const { spinLoader, skeletonLoader } = loaders;
  const { results: locations, info: pagesInfo } = data;

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

  const buttonAdd = (
    <Link href="/locations/create">
      <Button variant="success w-full lg:w-4/5" type="submit">
        Add location
      </Button>
    </Link>
  );

  return (
    <PageWrapper
      title={"List of locations"}
      buttonAdd={buttonAdd}
      query={query}
      setData={setData as (data: ResponseData<RMItem>) => void}
      filterConfig={filterConfig}
      pagesInfo={pagesInfo}
      api={"locations"}
      setLoaders={setLoaders}
    >
      {skeletonLoader && (
        <TableSkeletons amount={20} pageColumns={locationsColumns} />
      )}
      {spinLoader ? (
        <Loader />
      ) : (
        <LocationList
          locations={locations}
          setData={setData}
          locationsColumns={locationsColumns}
          setLoaders={setLoaders}
        />
      )}
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { query: query || null } };
};

export default LocationsPage;
