import axios from "axios";
import React, { useEffect, useState } from "react";
import LocationFormComponent from "../../../../components/LocationFormComponent";
import Wrapper from "../../../../components/Wrapper";
import Router from "next/router";

const EditLocation = (props) => {
  const [location, setLocation] = useState();

  const submitHandler = async ({ id, name, dimension, type }) => {
    const location = {
      id: id,
      name: name,
      dimension: dimension,
      type: type,
    };

    const response = await axios.put(
      `/api/locations/${encodeURIComponent(id)}`,
      location
    );
    if (response.status === 200) {
      Router.push("/locations");
    }
  };

  const getLocation = async () => {
    const response = await axios.get(
      `/api/locations/${encodeURIComponent(props.params.id)}`
    );

    setLocation(response.data.location);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return location ? (
    <Wrapper title={"Edit location: " + location.name}>
      <LocationFormComponent
        submitHandler={submitHandler}
        initialData={location}
      />
    </Wrapper>
  ) : (
    <div>Loading...</div>
  );
};

export default EditLocation;

export async function getServerSideProps({ params }) {
  return { props: { params } };
}
