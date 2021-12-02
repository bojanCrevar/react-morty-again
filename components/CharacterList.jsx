import React from "react";
import CharCard from "./CharCard";

function CharacterList(props) {


  console.log(props);
  return (
    <div>
      {props.characters.map((c) => (
        <CharCard {...c} />
      ))}
    </div>
  );
};

export default CharacterList;
