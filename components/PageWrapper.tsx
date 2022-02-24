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
import { emptyPagination, PaginationModel } from "../model/paginationModel";
import { ResponseData } from "../model/ResponseDataModel";
import { RMItem } from "../model/RMItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../model/storeModel";
import { filterActions } from "../store/filter-slice";
import Link from "next/link";
import { Button } from "react-bootstrap";
interface PageWrapperProps {
  children: React.ReactNode;
  title: string;
  query: QueryParams;
  addNewItemBtn: { href: string; content: string };
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
  addNewItemBtn,
  setData,
  filterConfig,
  pagesInfo,
  api,
  setSkeleton,
  setLoader,
}: PageWrapperProps) => {
  const dispatch = useDispatch();

  function selectFromReduxOrQuery(
    propName: keyof QueryParams,
    stateValue: any,
    setAction: (payload: any) => { payload: any; type: string }
  ) {
    const queryValue = query ? query[propName] : null;
    if (queryValue && stateValue !== queryValue) {
      dispatch(setAction(queryValue));
    }
    const value = queryValue || stateValue;
    return value;
  }

  const keyword = selectFromReduxOrQuery(
    "keyword",
    useSelector((state: RootState) => state.filter.keyword),
    filterActions.setKeyword
  );

  const filterObject = useSelector(
    (state: RootState) => state.filter.filterObject
  );

  const router = useRouter();
  const [activePage, setActivePage] = useState(+query?.activePage || 1);
  const [sort, setSort] = useState(query?.sort || "id");
  const [mobile, setMobile] = useState<Boolean>(true);
  //const [filterObject, setFilterObject] = useState<FilterModel>({});
  const [submitButtonClick, setSubmitButtonClick] = useState(false);

  function triggerSearch() {
    setSubmitButtonClick((prev) => !prev);
  }

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

  function createQuery(keyword: string) {
    const keywordQuery: string = keyword ? `&keyword=${keyword}` : "";
    router.push(
      `?activePage=${activePage}${keywordQuery}&sort=${sort}${constructFilterQuery(
        filterObject
      )}`,
      undefined,
      {
        shallow: true,
      }
    );
  }

  function handleResize() {
    if (window.innerWidth < 1024 && !mobile) {
      setMobile(true);
    } else if (window.innerWidth >= 1024 && mobile) {
      setMobile(false);
    }
  }

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    if (pagesInfo !== emptyPagination) {
      if (activePage > pagesInfo.pages && pagesInfo.pages > 0) {
        setActivePage(pagesInfo.pages);
      } else fetchData();
    }
  }, [pagesInfo.pages, pagesInfo.count]);

  useEffect(() => {
    createQuery(keyword);
    setLoader(true);
    fetchData();
  }, [activePage, sort, submitButtonClick]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
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
              triggerSearch={triggerSearch}
              setActivePage={setActivePage}
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
          {mobile && (
            <FilterPanelMobile
              filterConfig={filterConfig}
              triggerSearch={triggerSearch}
              setActivePage={setActivePage}
            />
          )}
        </div>
        <Searchbar
          initKeyword={keyword}
          setActivePage={setActivePage}
          triggerSearch={triggerSearch}
        />
        <div className="flex flex-col w-full space-y-2 mt-3 lg:flex-row lg:space-y-0">
          <div className="flex items-start lg:w-1/2">
            <Link href={addNewItemBtn.href}>
              <Button variant="success w-full lg:w-4/5" type="submit">
                {addNewItemBtn.content}
              </Button>
            </Link>
          </div>
          <div className="lg:w-1/2">
            <SortComponent setSort={setSort} initSort={sort} />
          </div>
        </div>
        <div className="mt-3 mt-md-1">{children}</div>
      </div>
    </div>
  );
};

export default PageWrapper;
