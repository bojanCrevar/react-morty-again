import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
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
    return showFave ? "btn-warning" : "btn-outline-warning";
  }

  function updateFinished(error: any) {
    setShowSpinner(false);
    if (error) {
      setShowWarning(error);
      setShowFave((prev) => !prev);
    }
  }

  const favouriteButton = (
    <Button
      className="btn-char"
      type="button"
      variant={"btn " + getStyle()}
      onClick={() => {
        setShowWarning("");
        setShowSpinner(true);
        setShowFave((prev) => !prev);
        toggleFavourite(!favouriteState, updateFinished);
      }}
    >
      <div>
        <FontAwesomeIcon
          icon={showFave ? fullHeart : faHeart}
          className="text-red-500 mr-2"
        />
        <span className={"font-semibold" + showFave && "text-red-700 "}>
          {!showFave ? "Add to favorites!" : "Favorited"}
        </span>
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
          ></div>
        )}
      </div>
    </Button>
  );

  return favouriteButton;
};

export default FavouriteIcon;
