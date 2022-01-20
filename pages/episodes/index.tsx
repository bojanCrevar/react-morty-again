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
import { ColumnCfg } from "../../model/columnCfgModel";
import Loader from "../../components/Spinner";
import TableSkeletons from "../../components/skeletons/TableSkeletons";

const EpisodesPage = ({ query }: { query: QueryParams }) => {
  const [skeleton, setSkeleton] = useState<Boolean>(true);
  const [loader, setLoader] = useState<Boolean>(false);
  const [data, setData] = useState<ResponseData<EpisodeItem>>({
    results: [],
    info: emptyPagination,
  });
  const { results: episodes, info: pagesInfo } = data;

  const buttonAdd = (
    <Link href="/episodes/create">
      <Button variant="success w-full lg:w-4/5" type="submit">
        Add episode
      </Button>
    </Link>
  );

  const filterConfig: FilterGroupConfig[] = [
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
  ];

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
      setLoader={setLoader}
      setSkeleton={setSkeleton}
    >
      {skeleton && <TableSkeletons amount={20} pageColumns={episodeColumns} />}
      {loader ? (
        <Loader />
      ) : (
        <EpisodeList episodes={episodes} episodeColumns={episodeColumns} />
      )}
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { query: query || null } };
};

export default EpisodesPage;
