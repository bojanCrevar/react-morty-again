import axios from "axios";
import Router from "next/router";
import FormComponent from "../../../components/characters/FormComponent";
import Wrapper from "../../../components/Wrapper";
import { CharactersItem } from "../../../model/charactersModel";

export default function CreateCharacter() {
  async function submitHandler(character: CharactersItem) {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_NODE_URL}/characters`,
      character
    );
    if (response.status === 201) {
      Router.push("/characters");
    }
  }

  const dummyInitialData = {
    _id: "",
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
