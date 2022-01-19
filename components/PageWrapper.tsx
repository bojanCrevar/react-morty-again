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
import { ResponseData } from "../model/ResponseDataModel";
import { RMItem } from "../model/RMItem";

interface PageWrapperProps {
  children: React.ReactNode;
  title: string;
  query: QueryParams;
  buttonAdd: React.ReactNode;
  setData: (data: ResponseData<RMItem>) => void;
  filterConfig: FilterGroupConfig[];
  pagesInfo: PaginationModel;
  api: string;
  setSkeleton: (bool: Boolean) => void;
  setLoader: (bool: Boolean) => void;
}

const PageWrapper = ({
  query,
  title,
  children,
  buttonAdd,
  setData,
  filterConfig,
  pagesInfo,
  api,
  setSkeleton,
  setLoader,
}: PageWrapperProps) => {
  const router = useRouter();
  const [activePage, setActivePage] = useState(+query?.activePage || 1);
  const [keyword, setKeyword] = useState(query?.keyword || "");
  const [sort, setSort] = useState(query?.sort || "id");
  const [mobile, setMobile] = useState<Boolean>(true);

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
      setData(response.data);
    } else {
      const response = await axios.get(`/api/${api}`, {
        params: { activePage, keyword, sort },
      });
      setTimeout(() => {
        setData(response.data);
        setSkeleton(false);
        setLoader(false);
      }, 700);
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

    setLoader(true);
  }, [activePage, keyword, sort]);

  useEffect(() => {
    function handleResize() {
      //console.log("resized to: ", window.innerWidth, "x", window.innerHeight);

      if (window.innerWidth < 1024) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  //console.log("mobile", mobile);

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
          <div className="w-2/3">
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
