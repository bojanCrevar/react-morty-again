import React, { useState } from "react";
import EpisodeList from "../../components/episodes/EpisodeList";
import { ResponseData } from "../../model/ResponseDataModel";
import { GetServerSideProps } from "next";
import PageWrapper from "../../components/PageWrapper";
import { FilterGroupConfig } from "../../model/filterModel";
import { EpisodeItem } from "../../model/episodeModel";
import { emptyPagination } from "../../model/paginationModel";
import { RMItem } from "../../model/RMItem";
import { FILTER_CONFIG_COMPARISON_COUNT } from "../../utils/sidebarFilter";
import { ColumnCfg } from "../../model/columnCfgModel";
import Loader from "../../components/Spinner";
import TableSkeletons from "../../components/skeletons/TableSkeletons";
import { ParsedUrlQuery } from "querystring";

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

const EpisodesPage = ({ query }: { query: ParsedUrlQuery }) => {
  const [skeleton, setSkeleton] = useState<Boolean>(true);
  const [loader, setLoader] = useState<Boolean>(false);
  const [data, setData] = useState<ResponseData<EpisodeItem>>({
    results: [],
    info: emptyPagination,
  });
  const { results: episodes, info: pagesInfo } = data;

  const addNewItemBtn = {
    href: "/episodes/create",
    content: "Add episode",
  };

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
      addNewItemBtn={addNewItemBtn}
      queryFromUrl={query}
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
        <EpisodeList
          episodes={episodes}
          episodeColumns={episodeColumns}
          setData={setData}
          setLoader={setLoader}
        />
      )}
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { query: query || null } };
};

export default EpisodesPage;
