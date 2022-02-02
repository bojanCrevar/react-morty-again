import axios from "axios";
import Router from "next/router";
import LocationFormComponent from "../../components/locations/FormComponent";
import Wrapper from "../../components/Wrapper";
import { LocationsItem, emptyLocationItem } from "../../model/locationsModel";

export default function CreateLocation() {
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
