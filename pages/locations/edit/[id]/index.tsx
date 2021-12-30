import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import LocationFormComponent from "../../../../components/LocationFormComponent";
import Wrapper from "../../../../components/Wrapper";
import Router from "next/router";
import { OverlayContext } from "../../../../context/OverlayContext";
import { GetServerSidePropsContext } from "next";
import {
  EditLocationsProps,
  LocationsItem,
} from "../../../../model/locationsModel";

const EditLocation = ({ id: idFromUrl }: EditLocationsProps) => {
  const [location, setLocation] = useState<LocationsItem>();

  const { setShowLoading, setMessage } = useContext(OverlayContext);

  const submitHandler = async ({
    id,
    name,
    dimension,
    type,
  }: LocationsItem) => {
    const location = {
      id: id,
      name: name,
      dimension: dimension,
      type: type,
    };

    const response = await axios.put(
      `/api/locations/${encodeURIComponent(id ?? 0)}`,
      location
    );
    if (response.status === 200) {
      Router.push("/locations");
    }
  };

  const getLocation = async () => {
    setShowLoading(true);
    setMessage("Loading location's editor...");
    try {
      const response = await axios.get(
        `/api/locations/${encodeURIComponent(idFromUrl)}`
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

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  return { props: params || {} };
}
