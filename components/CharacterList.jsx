import React from "react";
import CharCard from "./CharCard";

function CharacterList(props) {
  return (
    <div>
      {props.characters.map((c) => (
        <CharCard {...c} key={c.id} />
      ))}
    </div>
  );
}

export default CharacterList;
