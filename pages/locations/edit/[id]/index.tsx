import axios from "axios";
import React, { useEffect, useState } from "react";
import LocationFormComponent from "../../../../components/locations/FormComponent";
import Wrapper from "../../../../components/Wrapper";
import Router from "next/router";
import { GetServerSidePropsContext } from "next";
import {
  EditLocationsProps,
  LocationsItem,
} from "../../../../model/locationsModel";
import EditSkeleton from "../../../../components/skeletons/EditSkeleton";
import locationsRepo from "../../../../utils/locations-repo";
import { useSelector } from "react-redux";
import { RootState } from "../../../../model/storeModel";

const EditLocation = ({ id: idFromUrl }: EditLocationsProps) => {
  const [location, setLocation] = useState<LocationsItem>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const submitHandler = async ({
    id,
    name,
    dimension,
    type,
    residents,
  }: LocationsItem) => {
    const location = {
      id: id,
      name: name,
      dimension: dimension,
      type: type,
      residents: residents,
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
    const response = await axios.get(
      `/api/locations/${encodeURIComponent(idFromUrl)}`
    );
    setLocation(response.data.location);
  };

  useEffect(() => {
    if (isLoggedIn) {
      getLocation();
    }
    Router.push("/locations");
  }, []);

  return location ? (
    <Wrapper title={"Edit location: " + location.name}>
      <LocationFormComponent
        submitHandler={submitHandler}
        initialData={location}
      />
    </Wrapper>
  ) : (
    <div className="m-auto">
      <EditSkeleton count={3} />
    </div>
  );
};

export default EditLocation;

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const id = params!.id;

  let location = locationsRepo.getById(id);

  if (!location) {
    return { notFound: true };
  }
  return { props: params || {} };
}
