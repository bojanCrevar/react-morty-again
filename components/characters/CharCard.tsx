import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import FavouriteIcon from "../FavoriteIcon";
import axios from "axios";
import { CharactersItem } from "../../model/charactersModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import styles from "./CharCard.module.css";

interface CharCardProps extends CharactersItem {
  handleDelete: (id: number) => void;
}

const CharCard = ({
  id,
  name,
  image,
  species,
  gender,
  status,
  location,
  handleDelete,
  favourite,
}: CharCardProps) => {
  const [favouriteState, setFavouriteState] = useState(favourite || false);

  function checkStatus(status: string) {
    if (status === "Alive") {
      return "text-green-700";
    } else if (status === "Dead") {
      return "text-red-700";
    } else {
      return "text-gray-700";
    }
  }

  async function toggleFavourite(
    favourite: boolean,
    finishedCallback: (error?: string) => void
  ) {
    try {
      await axios.put("api/characters/" + id, {
        id: id,
        name: name,
        image: image,
        species: species,
        gender: gender,
        status: status,
        location: location?.name,
        favourite: favourite,
      });
      finishedCallback();
    } catch (e: any) {
      finishedCallback(e.response.data.error);
    }
  }

  return (
    <div className="bg-white rounded mt-2 p-2 flex flex-col sm:flex-row">
      <div className="flex space-x-4 w-full">
        <div className="w-1/2 sm:w-1/3 lg:w-1/4 h-36 relative">
          {image ? (
            <img
              src={image}
              className="rounded w-full h-full"
              alt="character"
              onError={(e: any) => {
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
        <div className="pt-4 text-sm md:text-base">
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
            {location?.name}
          </div>
        </div>
      </div>

      <div
        className={`w-full sm:w-1/4 md:w-2/4 mt-2 space-x-4 sm:space-x-0 sm:space-y-2 flex  ${styles.button}`}
      >
        <div className="w-1/3 sm:w-full">
          <FavouriteIcon
            toggleFavourite={toggleFavourite}
            favouriteState={favouriteState}
          />
        </div>
        <div className="w-1/3 sm:w-full">
          <Link href={"characters/edit/" + id}>
            <Button variant="outline-info" className="btn-char">
              <div className="flex justify-center md:space-x-2">
                <div>
                  <FontAwesomeIcon icon={faEdit} />
                </div>
                <div>
                  <span className="hidden md:block">Edit character</span>
                </div>
              </div>
            </Button>
          </Link>
        </div>
        <div className="w-1/3 sm:w-full">
          <Button
            className="btn-char"
            variant="btn btn-danger"
            onClick={() => handleDelete(id)}
          >
            <div className="flex justify-center md:space-x-2">
              <div>
                <FontAwesomeIcon icon={faTrashAlt} />
              </div>
              <div>
                <span className="hidden md:block">Delete</span>
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CharCard;
