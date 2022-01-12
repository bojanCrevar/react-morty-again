import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import LocationList from "../../components/LocationList";
import Searchbar from "../../components/Searchbar";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import SortComponent from "../../components/SortComponent";
import { useRouter } from "next/router";
import { LocationsModel } from "../../model/locationsModel";
import { GetServerSideProps } from "next";
import { QueryParams } from "../../model/queryParams";
import { FilterGroupConfig, FilterModel } from "../../model/filterModel";
import FilterPanel from "../../components/FilterPanel";
import PageWrapper from "../../components/PageWrapper";
import FilterPanelMobile from "../../components/mobile/FilterPanelMobile";

const LocationsPage = ({ query }: { query: QueryParams }) => {
  const router = useRouter();
  const [activePage, setActivePage] = useState(+query?.activePage || 1);
  const [keyword, setKeyword] = useState(query?.keyword || "");
  const [sort, setSort] = useState(query?.sort || "id");
  const [mobile, setMobile] = useState<Boolean>();
  const [data, setData] = useState<LocationsModel>({
    info: { count: 0, pages: 1 },
    results: [],
  });
  const { results: locations, info: pagesInfo } = data;

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
      const response = await axios.get("/api/locations", {
        params: { activePage, keyword, sort, filterObject },
        paramsSerializer: (params) => {
          return `activePage=${params.activePage}&keyword=${
            params.keyword
          }&sort=${params.sort}${constructFilterQuery(params.filterObject)}`;
        },
      });
      setData(response.data);
    } else {
      const response = await axios.get("api/locations", {
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
  });

  console.log("mobile", mobile);

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

  const filterComponent = !mobile && (
    <FilterPanel filterConfig={filterConfig} submitFilterHandler={fetchData} />
  );

  const content = (
    <>
      <h5 className="p-4 text-4xl text-center">
        List of locations - {pagesInfo.count}
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
      <div className="flex flex-col relative w-full space-y-2 pt-4 lg:flex-row lg:space-y-0">
        <div className="lg:w-2/3">
          <Link href="/locations/create">
            <Button variant="success w-1/2" type="submit">
              Add location
            </Button>
          </Link>
        </div>
        <div className="lg:w-1/3">
          <SortComponent setSort={setSort} initSort={sort} />
        </div>
      </div>
      {mobile && (
        <FilterPanelMobile
          filterConfig={filterConfig}
          submitFilterHandler={fetchData}
        />
      )}
      <div className="mt-8">
        <LocationList locations={locations} fetchData={fetchData} />
      </div>
    </>
  );

  return <PageWrapper filterComponent={filterComponent} content={content} />;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { query: query || null } };
};

export default LocationsPage;
