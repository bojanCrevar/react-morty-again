import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import LocationList from "../../components/LocationList";
import Searchbar from "../../components/Searchbar";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import SortComponent from "../../components/SortComponent";

const LocationsPage = () => {
  const [locations, setLocations] = useState();
  const [activePage, setActivePage] = useState(1);
  const [keyword, setKeyword] = useState();
  const [pagesInfo, setPagesInfo] = useState({});
  const [sort, setSort] = useState("id");

  async function fetchData() {
    const response = await axios.get("api/locations", {
      params: { activePage, keyword, sort },
    });

    setLocations(response.data.results);
    setPagesInfo(response.data.info);
  }
  useEffect(() => {
    fetchData();
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

export default LocationsPage;
