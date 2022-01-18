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

const EpisodesPage = ({ query }: { query: QueryParams }) => {
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
      title: "Season",
      values: ["S01", "S02", "S03"],
      type: "checkbox",
      key: "episode",
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
    >
      <EpisodeList episodes={episodes} />
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { query: query || null } };
};

export default EpisodesPage;
