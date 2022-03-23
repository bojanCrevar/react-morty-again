import { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import FormComponent from "../../../../components/characters/FormComponent";
import Wrapper from "../../../../components/Wrapper";
import { CharactersItem } from "../../../../model/charactersModel";
import { GetServerSidePropsContext } from "next/types";
import EditSkeleton from "../../../../components/skeletons/EditSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "../../../../model/storeModel";

type EditCharacterProps = {
  character: CharactersItem;
};

export default function EditCharacter({ character }: EditCharacterProps) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const token = useSelector((state: RootState) => state.auth.token);

  async function submitHandler({
    _id,
    name,
    status,
    gender,
    species,
    location,
    image,
  }: CharactersItem) {
    const character = {
      name: name,
      status: status,
      gender: gender,
      species: species,
      location: location,
      image: image,
    };

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_NODE_URL}/characters/${_id}`,
      character,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 200) {
      Router.push("/characters");
    }
  }

  useEffect(() => {
    if (!isLoggedIn) {
      Router.push("/characters");
    }
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

  const character = await axios(
    `${process.env.NEXT_PUBLIC_NODE_URL}/characters/${id}`
  );

  if (!character.data) {
    return { notFound: true };
  }
  return { props: { character: character.data || {} } };
}
