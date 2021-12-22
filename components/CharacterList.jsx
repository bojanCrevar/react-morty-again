import React from "react";
import CharCard from "./CharCard";

function CharacterList(props) {
  return (
    <div>
      {props.characters.map((c) => (
        <CharCard {...c} key={c.id} fetchData={props.fetchData} />
      ))}
    </div>
  );
}

export default CharacterList;