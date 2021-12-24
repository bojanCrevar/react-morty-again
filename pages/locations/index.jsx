import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination.tsx";
import LocationList from "../../components/LocationList";
import Searchbar from "../../components/Searchbar.tsx";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import SortComponent from "../../components/SortComponent.tsx";
import { useRouter } from "next/router";

const LocationsPage = (props) => {
  const router = useRouter();
  const [activePage, setActivePage] = useState(+props?.query?.activePage || 1);
  const [keyword, setKeyword] = useState(props?.query?.keyword || "");
  const [sort, setSort] = useState("id");
  const [data, setData] = useState({});
  const { results: locations, info: pagesInfo = {} } = data;

  async function fetchData() {
    const response = await axios.get("api/locations", {
      params: { activePage, keyword, sort },
    });
    setData(response.data);
  }

  useEffect(() => {
    fetchData();
    const keywordQuery = keyword ? `&keyword=${keyword}` : "";
    const sortQuery = sort ? `&sort=${sort}` : "";
    router.push(
      `?activePage=${activePage}${keywordQuery}${sortQuery}`,
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
      <Searchbar setKeyword={setKeyword} setActivePage={setActivePage} />
      <div className="pt-4 relative">
        <Link href="/locations/create">
          <Button variant="success w-1/2" type="submit">
            Add location
          </Button>
        </Link>
        <SortComponent setSort={setSort} />
      </div>
      <div className="mt-8">
        {locations ? (
          <LocationList locations={locations} fetchData={fetchData} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps({ query }) {
  return { props: { query: query || null } };
}

export default LocationsPage;
