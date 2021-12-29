import axios from "axios";
import Router from "next/router";
import FormComponent from "../../../components/FormComponent";
import Wrapper from "../../../components/Wrapper";
import { CharactersModel } from "../../../model/charactersModel";

export default function CreateCharacter() {
  async function submitHandler({
    name,
    status,
    gender,
    species,
    location,
    image,
  }: CharactersModel) {
    const character = {
      name: name,
      status: status,
      gender: gender,
      species: species,
      location: { name: location },
      image: image,
    };
    const response = await axios.post("/api/characters", character);
    if (response.status === 200) {
      Router.push("/characters");
    }
  }

  const dummyInitialData = {
    id: -55,
    gender: "",
    image: "",
    name: "",
    species: "",
    status: "",
  };

  return (
    <Wrapper title={"Create new character!"}>
      <FormComponent
        submitHandler={submitHandler}
        initialData={dummyInitialData}
      />
    </Wrapper>
  );
}
