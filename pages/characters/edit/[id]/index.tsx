import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Router from "next/router";
import FormComponent from "../../../../components/FormComponent";
import Wrapper from "../../../../components/Wrapper";
import { OverlayContext } from "../../../../context/OverlayContext";
import { CharactersModel } from "../../../../model/charactersModel";
import { GetServerSidePropsContext } from "next/types";
import { ParsedUrlQuery } from "querystring";

type EditCharacterProps = {
  params: {
    id: string;
  };
};

export default function EditCharacter(props: EditCharacterProps) {
  const [character, setCharacter] = useState<CharactersModel>();

  const { setShowLoading, setMessage } = useContext(OverlayContext);

  async function submitHandler({
    id,
    name,
    status,
    gender,
    species,
    location,
    image,
  }: CharactersModel) {
    const character = {
      id: id,
      name: name,
      status: status,
      gender: gender,
      species: species,
      location: location,
      image: image,
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
    setShowLoading(true);
    setMessage("Loading character's editor");

    try {
      const response = await axios.get(
        `/api/characters/${encodeURIComponent(props.params.id)}`
      );
      setCharacter(response.data.character);
    } finally {
      setShowLoading(false);
    }
  }

  useEffect(() => {
    getCharacter();
  }, []);

  return character ? (
    <Wrapper title={"Edit character: " + character.name}>
      <FormComponent submitHandler={submitHandler} initialData={character} />
    </Wrapper>
  ) : null;
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  return { props: { params: params || {} } };
}
