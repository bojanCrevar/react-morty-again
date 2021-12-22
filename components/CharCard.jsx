import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import FavouriteIcon from "./FavoriteIcon";
import axios from "axios";

const CharCard = ({
  id,
  name,
  image,
  species,
  gender,
  status,
  location,
  fetchData,
  favourite,
}) => {
  const [favouriteState, setFavouriteState] = useState(favourite);

  function checkStatus(status) {
    if (status === "Alive") {
      return "text-green-700";
    } else if (status === "Dead") {
      return "text-red-700";
    } else {
      return "text-gray-700";
    }
  }

  async function toggleFavourite(favourite, finishedCallback) {
    try {
      const response = await axios.put("api/characters/" + id, {
        id: id,
        name: name,
        image: image,
        species: species,
        gender: gender,
        status: status,
        location: location.name,
        favourite: favourite,
      });

      console.log("response", response);

      finishedCallback();
    } catch (error) {
      console.log(error);
      finishedCallback(error.response.data.error);
    }
  }

  async function handleDelete(id) {
    const response = await axios.delete(
      `/api/characters/${encodeURIComponent(id)}`
    );

    if (response.status === 200) {
      fetchData();
    }
  }

  return (
    <div className="flex flex-row space-x-4 mt-4 border-2 bg-white">
      <div className="w-1/6">
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

      <div className="w-3/6 p-2">
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
      <div className="w-2/6 flex flex-col text-right space-y-2 p-2 ">
        <div>
          <FavouriteIcon
            toggleFavourite={toggleFavourite}
            favouriteState={favouriteState}
          />
        </div>
        <div>
          <Link href={"characters/edit/" + id}>
            <Button variant="outline-info" className="w-5/6 ">
              Edit character
            </Button>
          </Link>
        </div>
        <div>
          <Button
            className="w-5/6 "
            variant="btn btn-danger"
            onClick={() => handleDelete(id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CharCard;