import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import LocationFormComponent from "../../../../components/LocationFormComponent";
import Wrapper from "../../../../components/Wrapper";
import Router from "next/router";
import { OverlayContext } from "../../../../context/OverlayContext";

const EditLocation = (props) => {
  const [location, setLocation] = useState();

  const { setShowLoading } = useContext(OverlayContext);

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
    setShowLoading(true);

    try {
      const response = await axios.get(
        `/api/locations/${encodeURIComponent(props.params.id)}`
      );
      setLocation(response.data.location);
    } finally {
      setShowLoading(false);
    }
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
  ) : null;
};

export default EditLocation;

export async function getServerSideProps({ params }) {
  return { props: { params } };
}
