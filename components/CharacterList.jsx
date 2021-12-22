import React from "react";
import CharCard from "./CharCard";
import axios from "axios";

function CharacterList({ characters, fetchData }) {
  async function handleDelete(id) {
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