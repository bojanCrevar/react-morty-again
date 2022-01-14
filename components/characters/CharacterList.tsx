import React from "react";
import CharCard from "./CharCard";
import axios from "axios";
import { CharactersItem } from "../../model/charactersModel";

type CharListProps = {
  characters: CharactersItem[];
  fetchData: () => void;
};

function CharacterList({ characters, fetchData }: CharListProps) {
  async function handleDelete(id: number) {
    const response = await axios.delete(
      `/api/characters/${encodeURIComponent(id)}`
    );

    if (response.status === 200) {
      fetchData();
    }
  }
  return (
    <div>
      {characters.map((c) => (
        <CharCard {...c} key={c.id} handleDelete={handleDelete} />
      ))}
    </div>
  );
}

export default CharacterList;
