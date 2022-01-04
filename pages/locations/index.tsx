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

const LocationsPage = ({ query }: { query: QueryParams }) => {
  const router = useRouter();
  const [activePage, setActivePage] = useState(+query?.activePage || 1);
  const [keyword, setKeyword] = useState(query?.keyword || "");
  const [sort, setSort] = useState(query?.sort || "id");
  const [data, setData] = useState<LocationsModel>({
    info: { count: 1, pages: 1 },
    results: [],
  });
  const { results: locations, info: pagesInfo } = data;

  async function fetchData() {
    const response = await axios.get("api/locations", {
      params: { activePage, keyword, sort },
    });
    setTimeout(() => setData(response.data), 700);
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

  return (
    <div className="m-auto w-1/2">
      <h5 className="p-4 text-4xl	text-center">
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
      <div className="pt-4 relative">
        <Link href="/locations/create">
          <Button variant="success w-1/2" type="submit">
            Add location
          </Button>
        </Link>
        <SortComponent setSort={setSort} initSort={sort} />
      </div>
      <div className="mt-8">
        <LocationList locations={locations} fetchData={fetchData} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { query: query || null } };
};

export default LocationsPage;
