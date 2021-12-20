import React from "react";
import Button from "react-bootstrap/Button";
import Link from "next/link";

const CharCard = ({
  id,
  name,
  image,
  species,
  gender,
  status,
  location,
  deleteCharacter,
}) => {
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
    <div className="flex flex-row space-x-4 mt-4 border-2 bg-white">
      <div>
        {image ? (
          <img
            src={image}
            className="h-36 w-44 "
            alt="character"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://rickandmortyapi.com/api/character/avatar/19.jpeg";
            }}
          />
        ) : (
          <div className="h-36 w-36 bg-green-700 text-white text-center">
            No image yet
          </div>
        )}
      </div>
      <div className="w-2/4 p-4">
        <div>{name}</div>
        <div>
          <span className={checkStatus(status)}>{status} </span>- {species}
        </div>
        <div>
          <span className="text-gray-400">Gender: </span>
          {gender}
        </div>
        <div>
          {" "}
          <span className="text-gray-400">Location: </span>
          {location.name}
        </div>
      </div>
      <div className="pt-12 pl-8 flex flex-row space-x-2 ">
        <div>
          <Link href={"characters/edit/" + id}>
            <Button variant="outline-info">Edit character</Button>
          </Link>
        </div>
        <div>
          <Button variant="btn btn-danger" onClick={() => deleteCharacter(id)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CharCard;
