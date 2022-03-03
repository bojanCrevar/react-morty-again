import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faExclamation,
  faHeart as fullHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

type FavouriteIconProps = {
  toggleFavourite: (
    favourite: boolean,
    finishedCallback: (error?: string) => void
  ) => void;
  favouriteState: boolean;
};

const FavouriteIcon = ({
  toggleFavourite,
  favouriteState,
}: FavouriteIconProps) => {
  const [showFave, setShowFave] = useState(favouriteState);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showWarning, setShowWarning] = useState("");

  function getStyle() {
    return showFave ? "btn-warning dark:bg-[#c4a23b]" : "btn-outline-warning";
  }

  function updateFinished(error: any) {
    setShowSpinner(false);
    if (error) {
      setShowWarning(error);
      setShowFave((prev) => !prev);
    }
  }

  return (
    <Button
      className="btn-char dark:focus:bg-[#c4a23b] dark:hover:bg-[#b49538]"
      type="button"
      variant={"btn " + getStyle()}
      onClick={() => {
        setShowWarning("");
        setShowSpinner(true);
        setShowFave((prev) => !prev);
        toggleFavourite(!favouriteState, updateFinished);
      }}
    >
      <div className="flex justify-center md:space-x-2">
        <div>
          <FontAwesomeIcon
            icon={showFave ? fullHeart : faHeart}
            className="text-red-500 mr-2"
          />
        </div>

        <div
          className={
            "font-semibold" +
            (showFave
              ? " text-red-700 dark:text-white "
              : " text-[#000] dark:text-white ")
          }
        >
          <span className="hidden md:block">
            {!showFave ? "Add to favorites!" : "Favorited"}
          </span>
        </div>
        <div>
          {showWarning && (
            <FontAwesomeIcon
              icon={faExclamation}
              className="ml-2"
              title={showWarning}
            />
          )}
          {showSpinner && (
            <div
              className="spinner-border"
              style={{ height: "20px", width: "20px", marginLeft: "10px" }}
            />
          )}
        </div>
      </div>
    </Button>
  );
};

export default FavouriteIcon;
