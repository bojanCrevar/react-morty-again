import React, { useState } from "react";
import EpisodeList from "../../components/episodes/EpisodeList";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import { ResponseData } from "../../model/ResponseDataModel";
import { GetServerSideProps } from "next";
import PageWrapper from "../../components/PageWrapper";
import { QueryParams } from "../../model/queryParams";
import { FilterGroupConfig } from "../../model/filterModel";
import { EpisodeItem } from "../../model/episodeModel";
import { emptyPagination } from "../../model/paginationModel";
import { RMItem } from "../../model/RMItem";
import { FILTER_CONFIG_COMPARISON_COUNT } from "../../utils/sidebarFilter";
import { ColumnCfg } from "../../model/columnCfgModel";
import Loader from "../../components/Spinner";
import TableSkeletons from "../../components/skeletons/TableSkeletons";
import { LoadersType } from "../../model/loaderModel";

export const filterConfig: FilterGroupConfig[] = [
  {
    title: "Season",
    values: ["S01", "S02", "S03"],
    type: "checkbox",
    key: "episode",
  },
  {
    title: "Characters count",
    values: ["0-15", "16-30", ">30"],
    type: "checkbox",
    key: "characters",
    operatorType: FILTER_CONFIG_COMPARISON_COUNT,
  },
];

const EpisodesPage = ({ query }: { query: QueryParams }) => {
  const [loaders, setLoaders] = useState<LoadersType>({
    spinLoader: false,
    skeletonLoader: true,
  });
  const [data, setData] = useState<ResponseData<EpisodeItem>>({
    results: [],
    info: emptyPagination,
  });
  const { spinLoader, skeletonLoader } = loaders;
  const { results: episodes, info: pagesInfo } = data;

  const buttonAdd = (
    <Link href="/episodes/create">
      <Button variant="success w-full lg:w-4/5" type="submit">
        Add episode
      </Button>
    </Link>
  );

  const episodeColumns: ColumnCfg<EpisodeItem>[] = [
    { key: "name", title: "Title" },
    { key: "air_date", title: "Release date" },
    { key: "episode", title: "Episode" },
    {
      key: "charactersString",
      title: "Characters",
      tooltip: "charactersTooltip",
    },
  ];

  return (
    <PageWrapper
      title={"List of episodes"}
      buttonAdd={buttonAdd}
      query={query}
      setData={setData as (data: ResponseData<RMItem>) => void}
      filterConfig={filterConfig}
      pagesInfo={pagesInfo}
      api={"episodes"}
      setLoaders={setLoaders}
    >
      {skeletonLoader && (
        <TableSkeletons amount={20} pageColumns={episodeColumns} />
      )}
      {spinLoader ? (
        <Loader />
      ) : (
        <EpisodeList
          episodes={episodes}
          episodeColumns={episodeColumns}
          setData={setData}
          setLoaders={setLoaders}
        />
      )}
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { query: query || null } };
};

export default EpisodesPage;
