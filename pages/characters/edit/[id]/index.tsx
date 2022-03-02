import { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import FormComponent from "../../../../components/characters/FormComponent";
import Wrapper from "../../../../components/Wrapper";
import { CharactersItem } from "../../../../model/charactersModel";
import { GetServerSidePropsContext } from "next/types";
import EditSkeleton from "../../../../components/skeletons/EditSkeleton";
import charRepo from "../../../../utils/character-repo";
import { useSelector } from "react-redux";
import { RootState } from "../../../../model/storeModel";

type EditCharacterProps = {
  params: {
    id: string;
  };
};

export default function EditCharacter(props: EditCharacterProps) {
  const [character, setCharacter] = useState<CharactersItem>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  async function submitHandler({
    id,
    name,
    status,
    gender,
    species,
    location,
    image,
  }: CharactersItem) {
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
    const response = await axios.get(
      `/api/characters/${encodeURIComponent(props.params.id)}`
    );
    setCharacter(response.data.character);
  }

  useEffect(() => {
    if (isLoggedIn) {
      getCharacter();
    }
    Router.push("/characters");
  }, []);

  return character ? (
    <Wrapper title={`Edit character: ${character.name}`}>
      <FormComponent submitHandler={submitHandler} initialData={character} />
    </Wrapper>
  ) : (
    <div className="m-auto">
      <EditSkeleton count={5} />
    </div>
  );
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const id = params!.id;

  let character = charRepo.getById(id);

  if (!character) {
    return { notFound: true };
  }
  return { props: { params: params || {} } };
}
