import React from "react";
import Button from "react-bootstrap/Button";
import Link from "next/link";

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

  return (
    <div>
      {props.characters.map((c) => (
        <div className="flex space-x-4 mt-4 border-2 bg-white" key={c.id}>
          {c.image ? (
            <img src={c.image} className="h-32" alt="character image" />
          ) : (
            <div className="bg-green-500 p-4">No image</div>
          )}
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
            <div>
              <Link href={"/edit/" + c.id}>
                <Button variant="outline-info">Edit character</Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CharacterList;
