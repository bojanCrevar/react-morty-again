import React from "react";
import Button from "react-bootstrap/Button";
import Link from "next/link";

const CharCard = ({ id, name, image, species, gender, status, location }) => {
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
    <div className="flex space-x-4 mt-4 border-2 bg-white">
      {image ? (
        <img src={image} className="h-32" alt="character" />
      ) : (
        <span className="bg-green-700 text-white">No image yet</span>
      )}
      <div>
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
        <div>
          <Link href={"characters/edit/" + id}>
            <Button variant="outline-info">Edit character</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CharCard;
