import axios from "axios";
import Router from "next/router";
import LocationFormComponent from "../../components/locations/LocationFormComponent";
import Wrapper from "../../components/Wrapper";
import { LocationsItem, emptyLocationItem } from "../../model/locationsModel";

export default function CreateLocation() {
  async function submitHandler({ name, dimension, type }: LocationsItem) {
    const location = {
      name: name,
      dimension: dimension,
      type: type,
    };
    const response = await axios.post("/api/locations", location);
    if (response.status === 200) {
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
