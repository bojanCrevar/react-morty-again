import axios from "axios";
import React, { useEffect } from "react";
import LocationFormComponent from "../../../../components/locations/FormComponent";
import Wrapper from "../../../../components/Wrapper";
import Router from "next/router";
import { GetServerSidePropsContext } from "next";
import {
  EditLocationsProps,
  LocationsItem,
} from "../../../../model/locationsModel";
import EditSkeleton from "../../../../components/skeletons/EditSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "../../../../model/storeModel";

const EditLocation = (props: EditLocationsProps) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const token = useSelector((state: RootState) => state.auth.token);

  const submitHandler = async ({
    _id,
    name,
    dimension,
    type,
    residents,
  }: LocationsItem) => {
    const location = {
      name: name,
      dimension: dimension,
      type: type,
      residents: residents,
    };

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_NODE_URL}/locations/${encodeURIComponent(
        _id
      )}`,
      location,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 200) {
      Router.push("/locations");
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      Router.push("/locations");
    }
  }, []);

  return props.location ? (
    <Wrapper title={"Edit location: " + props.location.name}>
      <LocationFormComponent
        submitHandler={submitHandler}
        initialData={props.location}
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

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_NODE_URL}/locations/${id}`
  );

  console.log("response location");

  if (response.status !== 200) {
    return { notFound: true };
  }

  return { props: { location: response.data || {} } };
}
