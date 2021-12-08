import axios from "axios";
import Router from "next/router";
import FormComponent from "../../../components/FormComponent";
import Wrapper from "../../../components/Wrapper";

export default function CreateCharacter() {
  async function submitHandler({ name, status, gender, species, location }) {
    const character = {
      name: name,
      status: status,
      gender: gender,
      species: species,
      location: { name: location },
    };
    const response = await axios.post("/api/characters", character);
    if (response.status === 200) {
      Router.push("/characters");
    }
  }

  return (
    <Wrapper title={"Create new character!"}>
      <FormComponent submitHandler={submitHandler} initialData={""} />
    </Wrapper>
  );
}
