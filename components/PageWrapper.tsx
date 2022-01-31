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
  const [filterObject, setFilterObject] = useState<FilterModel>({});

  function constructFilterQuery(filterObject: FilterModel) {
    let filterQuery = "";

    for (let key in filterObject) {
      let value = filterObject[key];
      value.forEach((val) => (filterQuery += `&filter.${key}[]=${val}`));
    }
    return filterQuery;
  }

  async function fetchData() {
    const response = await axios.get(`/api/${api}`, {
      params: { activePage, keyword, sort, filterObject },
      paramsSerializer: (params) => {
        return `activePage=${params.activePage}&keyword=${
          params.keyword
        }&sort=${params.sort}${constructFilterQuery(params.filterObject)}`;
      },
    });
    setTimeout(() => {
      setData(response.data);
      setSkeleton(false);
      setLoader(false);
    }, 700);
  }

  useEffect(() => {
    if (activePage > pagesInfo.pages) {
      setActivePage(pagesInfo.pages);
    }
    fetchData();
  }, [pagesInfo.pages, pagesInfo.count]); // it's working when I separate pagesInfo to its two values
  // but when I put it as an object, this useEffect creates a loop

  useEffect(() => {
    const keywordQuery = keyword ? `&keyword=${keyword}` : "";
    router.push(
      `?activePage=${activePage}${keywordQuery}&sort=${sort}${constructFilterQuery(
        filterObject
      )}`,
      undefined,
      {
        shallow: true,
      }
    );
    setLoader(true);
    fetchData();
  }, [activePage, keyword, sort, filterObject]);

  useEffect(() => {
    function handleResize() {
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

  return (
    <div className="flex mb-4 w-full">
      {!mobile ? (
        <div className="w-1/4">
          <div className="w-1/2 ml-28 mt-44">
            <FilterPanel
              filterConfig={filterConfig}
              setFilterObject={setFilterObject}
            />
          </div>
        </div>
      ) : (
        <div className="w-1/12">{null}</div>
      )}
      <div className="w-10/12 lg:w-1/2">
        <h5 className="p-4 text-4xl text-center">
          {title} : {pagesInfo.count}
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
              setFilterObject={setFilterObject}
            />
          ) : null}
        </div>
        <Searchbar
          setKeyword={setKeyword}
          initKeyword={keyword}
          setActivePage={setActivePage}
        />
        <div className="flex flex-col w-full space-y-2 mt-3 lg:flex-row lg:space-y-0">
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
