import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import LocationList from "../components/LocationList";

const LocationsPage = () => {
  const [locations, setLocations] = useState([]);

  async function fetchData() {
    const response = await axios.get("api/locations");

    setLocations(response.data.results);
    console.log(response.data.results);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <LocationList locations={locations} />
    </div>
  );
};

export default LocationsPage;
