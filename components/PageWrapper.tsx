import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FilterModel, FilterGroupConfig } from "../model/filterModel";
import FilterPanel from "./FilterPanel";
import SortComponent from "./SortComponent";
import Searchbar from "./Searchbar";
import Pagination from "./Pagination";
import { QueryParams } from "../model/queryParams";
import FilterPanelMobile from "./mobile/FilterPanelMobile";
import { PaginationModel } from "../model/paginationModel";
import { ResponseData as EpModel } from "../model/episodeModel";
import { ResponseData as CharModel } from "../model/charactersModel";
import { ResponseData as LocModel } from "../model/locationsModel";

type PageWrapperProps = {
  children: React.ReactNode;
  title: string;
  query: QueryParams;
  buttonAdd: React.ReactNode;
  //setData: (data: EpModel | CharModel | LocModel) => void;
  setLocData?: (data: LocModel) => void;
  setEpData?: (data: EpModel) => void;
  setCharData?: (data: CharModel) => void;
  filterConfig: FilterGroupConfig[];
  pagesInfo: PaginationModel;
  api: string;
};
const PageWrapper = ({
  query,
  title,
  children,
  buttonAdd,
  setLocData,
  setEpData,
  setCharData,
  filterConfig,
  pagesInfo,
  api,
}: PageWrapperProps) => {
  const router = useRouter();
  const [activePage, setActivePage] = useState(+query?.activePage || 1);
  const [keyword, setKeyword] = useState(query?.keyword || "");
  const [sort, setSort] = useState(query?.sort || "id");
  const [mobile, setMobile] = useState<Boolean>();

  function constructFilterQuery(filterObject: FilterModel) {
    let filterQuery = "";
    for (let key in filterObject) {
      let value = filterObject[key];
      value.forEach((val) => (filterQuery += `&filter.${key}[]=${val}`));
    }
    return filterQuery;
  }

  async function fetchData(filterObject?: FilterModel) {
    if (filterObject) {
      const response = await axios.get(`/api/${api}`, {
        params: { activePage, keyword, sort, filterObject },
        paramsSerializer: (params) => {
          return `activePage=${params.activePage}&keyword=${
            params.keyword
          }&sort=${params.sort}${constructFilterQuery(params.filterObject)}`;
        },
      });
      api === "locations"
        ? setLocData!(response.data)
        : api === "characters"
        ? setCharData!(response.data)
        : setEpData!(response.data);
    } else {
      const response = await axios.get(`/api/${api}`, {
        params: { activePage, keyword, sort },
      });
      setTimeout(
        () =>
          api === "locations"
            ? setLocData!(response.data)
            : api === "characters"
            ? setCharData!(response.data)
            : setEpData!(response.data),
        700
      );
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

  useEffect(() => {
    function handleResize() {
      console.log("resized to: ", window.innerWidth, "x", window.innerHeight);

      if (window.innerWidth < 1024) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    }

    window.addEventListener("load", handleResize);
    window.addEventListener("resize", handleResize);
  }, []);

  console.log("mobile", mobile);

  return (
    <div className="flex mb-4 w-full">
      {!mobile ? (
        <div className="w-1/4">
          <div className="w-1/2 ml-28 mt-44">
            <FilterPanel
              filterConfig={filterConfig}
              submitFilterHandler={fetchData}
            />
          </div>
        </div>
      ) : (
        <div className="w-1/12">{null}</div>
      )}
      <div className="w-10/12 lg:w-1/2">
        <h5 className="p-4 text-4xl text-center">
          {title} - {pagesInfo.count}
        </h5>
        <div className="flex lg:flex-row space-x-2">
          <div className="m-0 w-2/3">
            <Pagination
              pagesInfo={pagesInfo}
              activePage={activePage}
              setActivePage={setActivePage}
            />
          </div>
          {mobile ? (
            <FilterPanelMobile
              filterConfig={filterConfig}
              submitFilterHandler={fetchData}
            />
          ) : null}
        </div>
        <Searchbar
          setKeyword={setKeyword}
          initKeyword={keyword}
          setActivePage={setActivePage}
        />
        <div className="flex flex-col w-full space-y-2 mt-4 lg:mt-4 lg:flex-row lg:space-y-0">
          <div className="flex items-start lg:w-1/2">{buttonAdd}</div>
          <div className="lg:w-1/2">
            <SortComponent setSort={setSort} initSort={sort} />
          </div>
        </div>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
};

export default PageWrapper;
