import React from "react";
import CharCard from "./CharCard";
import axios from "axios";
import { CharactersItem } from "../../model/charactersModel";
import { ResponseData } from "../../model/ResponseDataModel";
import { PaginationModel } from "../../model/paginationModel";

type CharListProps = {
  characters: CharactersItem[];
  setData: (data: ResponseData<CharactersItem>) => void;
  pagesInfo: PaginationModel;
};

function CharacterList({ characters, setData, pagesInfo }: CharListProps) {
  async function handleDelete(id: number) {
    setData({
      results: characters.filter((x) => x.id !== id),
      info: pagesInfo,
    });
    const response = await axios.delete(
      `/api/characters/${encodeURIComponent(id)}`
    );
  }
  return (
    <>
      {characters.map((c) => (
        <CharCard {...c} key={c.id} handleDelete={handleDelete} />
      ))}
    </>
  );
}

export default CharacterList;
