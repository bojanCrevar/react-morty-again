import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import LocationList from "../../components/LocationList";
import Searchbar from "../../components/Searchbar";
import Link from "next/link";
import Button from "react-bootstrap/Button";

const LocationsPage = () => {
  const [locations, setLocations] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [keyword, setKeyword] = useState();
  const [pagesInfo, setPagesInfo] = useState({});

  async function fetchData() {
    const response = await axios.get("api/locations", {
      params: { activePage, keyword },
    });

    setLocations(response.data.results);
    setPagesInfo(response.data.info);
  }

  useEffect(() => {
    if (activePage !== 1) {
      setActivePage(1);
    } else {
      fetchData();
    }
  }, [keyword]);

  useEffect(() => {
    fetchData();
  }, [activePage]);

  return (
    <div className="m-auto w-1/2">
      <h5 className="p-4 text-4xl	text-center">
        List of Locations - {pagesInfo.count}
      </h5>

      <Pagination
        pagesInfo={pagesInfo}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div>Pages: {pagesInfo.pages}</div>
      <Searchbar setKeyword={setKeyword} />
      <div className="pt-4">
        <Link href="locations/create">
          <Button variant="success w-1/2" type="submit">
            Add location
          </Button>
        </Link>
      </div>
      <LocationList locations={locations} />
    </div>
  );
};

export default LocationsPage;
