import React, { Dispatch, SetStateAction } from "react";
import CharCard from "./CharCard";
import axios from "axios";
import { CharactersItem } from "../../model/charactersModel";
import { ResponseData } from "../../model/ResponseDataModel";

type CharListProps = {
  characters: CharactersItem[];
  setData: Dispatch<SetStateAction<ResponseData<CharactersItem>>>;
};

function CharacterList({ characters, setData }: CharListProps) {
  async function handleDelete(id: number) {
    setData((prev) => ({
      ...prev,
      results: characters.filter((x) => x.id !== id),
    }));
    const response = await axios.delete(
      `/api/characters/${encodeURIComponent(id)}`
    );
  }
  return (
    <>
      {characters.length > 0 ? (
        characters.map((c) => (
          <CharCard {...c} key={c.id} handleDelete={handleDelete} />
        ))
      ) : (
        <div className="mt-4 bg-white rounded p-3 text-lg text-center">
          No items found!
        </div>
      )}
    </>
  );
}

export default CharacterList;
