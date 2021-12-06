import { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import FormComponent from "../../../../components/FormComponent";
import myCharactersRepo from "../../../../utils/character-repo";
import Wrapper from "../../../../components/Wrapper";

export default function EditCharacter(props) {
  const [character, setCharacter] = useState();

  async function submitHandler({
    id,
    name,
    status,
    gender,
    species,
    location,
  }) {
    const character = {
      id: id,
      name: name,
      status: status,
      gender: gender,
      species: species,
      location: location,
    };

    const response = await axios.put(
      `/api/characters/${encodeURIComponent(id)}`,
      character
    );
    if (response.status === 200) {
      Router.push("/characters");
    }
  }

  async function getCharacter() {
    const response = await axios.get(
      `/api/characters/${encodeURIComponent(props.params.id)}`
    );

    setCharacter(response.data.character);
  }

  useEffect(() => {
    getCharacter();
  }, []);

  return character ? (
    <Wrapper title={"Edit character: " + character.name}>
      <FormComponent submitHandler={submitHandler} initialData={character} />
    </Wrapper>
  ) : (
    <h1> Loading </h1>
  );
}
export async function getServerSideProps({ params }) {
  return { props: { params } };
}
