import axios from "axios";
import Router from "next/router";
import { useSelector } from "react-redux";
import LocationFormComponent from "../../components/locations/FormComponent";
import Wrapper from "../../components/Wrapper";
import { LocationsItem, emptyLocationItem } from "../../model/locationsModel";
import { RootState } from "../../model/storeModel";

export default function CreateLocation() {
  const token = useSelector((state: RootState) => state.auth.token);
  async function submitHandler({
    name,
    dimension,
    type,
    residents,
  }: LocationsItem) {
    const location = {
      name: name,
      dimension: dimension,
      type: type,
      residents: residents,
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_NODE_URL}/locations/`,
      location,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 201) {
      Router.push("/locations");
    }
  }

  return (
    <Wrapper title={"Create new location"}>
      <LocationFormComponent
        submitHandler={submitHandler}
        initialData={emptyLocationItem}
      />
    </Wrapper>
  );
}
