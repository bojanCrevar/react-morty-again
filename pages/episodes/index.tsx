import React, { useState, useEffect } from "react";
import EpisodeList from "../../components/episodes/EpisodeList";
import axios from "axios";
import Pagination from "../../components/Pagination";
import Searchbar from "../../components/Searchbar";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import SortComponent from "../../components/SortComponent";
import { useRouter } from "next/router";
import { ResponseData } from "../../model/episodeModel";
import { GetServerSidePropsContext } from "next/types";
import PageWrapper from "../../components/PageWrapper";
import { FilterGroupConfig, FilterModel } from "../../model/filterModel";
import FilterPanel from "../../components/FilterPanel";

interface EpisodeProps {
  query: {
    [key: string]: string;
  };
}

const EpisodesPage = ({ query }: EpisodeProps) => {
  const router = useRouter();
  const [activePage, setActivePage] = useState(+query?.activePage || 1);
  const [keyword, setKeyword] = useState(query?.keyword || "");
  const [sort, setSort] = useState(query?.sort || "id");
  const [data, setData] = useState<ResponseData>({
    results: [],
    info: { count: 0, pages: 1 },
  });
  const { results: episodes, info: pagesInfo } = data;

  function constructFilterQuery(filterObject: FilterModel) {
    let filterQuery = "";
    for (let key in filterObject) {
      let value = filterObject[key];
      value.forEach((val) => (filterQuery += `&filter.${key}[]=${val}`));
    }

    return filterQuery;
  }

  async function fetchData(filterObject?: FilterModel) {
    console.log("filterObject", filterObject);
    if (filterObject) {
      const response = await axios.get("/api/episodes", {
        params: { activePage, keyword, sort, filterObject },
        paramsSerializer: (params) => {
          return `activePage=${params.activePage}&keyword=${
            params.keyword
          }&sort=${params.sort}${constructFilterQuery(params.filterObject)}`;
        },
      });
      setData(response.data);
    } else {
      const response = await axios.get("/api/episodes", {
        params: { activePage, keyword, sort },
      });
      setTimeout(() => setData(response.data), 700);
    }
  }

  useEffect(() => {
    fetchData();
    const keywordQuery = keyword ? `&keyword=${keyword}` : "";
    router.push(
      `?activePage=${activePage}${keywordQuery}&sort=${sort}`,
      undefined,
      {
        shallow: true,
      }
    );
  }, [activePage, keyword, sort]);

  const filterConfig: FilterGroupConfig[] = [
    {
      title: "Season",
      values: ["S01", "S02", "S03"],
      type: "checkbox",
      key: "episode",
    },
  ];

  const content = (
    <>
      <h5 className="p-4 text-4xl text-center">
        Episodes list: {pagesInfo.count}
      </h5>
      <Pagination
        pagesInfo={pagesInfo}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div>Pages: {pagesInfo.pages}</div>
      <Searchbar
        setKeyword={setKeyword}
        initKeyword={keyword}
        setActivePage={setActivePage}
      />
      <div className="pt-4 relative">
        <Link href="/episodes/create">
          <Button variant="success w-1/2" type="submit">
            Add episode
          </Button>
        </Link>
        <SortComponent setSort={setSort} initSort={sort} />
      </div>
      <div className="mt-8">
        <EpisodeList episodes={episodes} />
      </div>
    </>
  );
  const filterComponent = (
    <FilterPanel filterConfig={filterConfig} submitFilterHandler={fetchData} />
  );
  return <PageWrapper filterComponent={filterComponent} content={content} />;
};

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  return { props: { query: query || null } };
}

export default EpisodesPage;
