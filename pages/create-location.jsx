import axios from "axios";
import Router from "next/router";
import LocationFormComponent from "../components/LocationFormComponent";
import Wrapper from "../components/Wrapper";

export default function CreateLocation() {
  async function submitHandler({ name, dimension, type }) {
    const location = {
      name: name,
      dimension: dimension,
      type: type,
    };
    const response = await axios.post("/api/locations/create", location);
    if (response.status === 200) {
      Router.push("/locations");
    }
  }

  return (
    <Wrapper title={"Create new location"}>
      <LocationFormComponent submitHandler={submitHandler} initialData={""} />
    </Wrapper>
  );
}
