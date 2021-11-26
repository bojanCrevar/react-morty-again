import React from "react";
import PaginationBar from "./PaginationBar";

function CharacterList(props) {
  function checkStatus(status) {
    if (status === "Alive") {
      return "text-green-700";
    } else if (status === "Dead") {
      return "text-red-700";
    } else {
      return "text-gray-700";
    }
  }

  console.log(props);
  return (
    <div>
      <PaginationBar
        className="my-8"
        setPageInfo={props.setPageInfo}
        pageInfo={props.pageInfo}
      />
      {props.characters.map((c) => (
        <div className="flex space-x-4 mt-4 border-2 bg-white" key={c.id}>
          <img src={c.image} className="h-32" />
          <div>
            <div>{c.name}</div>
            <div>
              <span className={checkStatus(c.status)}>{c.status} </span>-{" "}
              {c.species}
            </div>
            <div>
              <span className="text-gray-400">Gender: </span>
              {c.gender}
            </div>
            <div>
              {" "}
              <span className="text-gray-400">Location: </span>
              {c.location.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CharacterList;
