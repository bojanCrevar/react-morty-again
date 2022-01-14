import { screen, render, fireEvent } from "@testing-library/react";
import FavoriteIcon from "../FavoriteIcon.tsx";

describe("FavoriteIcon component", () => {
  test("render 'Favorited' on screen", () => {
    let favouriteState = false;

    const toggleFavourite = (favouriteState, finishedCallback) => {
      finishedCallback();
    };

    render(
      <FavoriteIcon
        toggleFavourite={toggleFavourite}
        favouriteState={favouriteState}
      />
    );

    const buttonElement = screen.getByRole("button", {
      name: "Add to favorites!",
    });

    fireEvent.click(buttonElement);

    const outputElem = screen.getByText("Favorited");
    expect(outputElem).toBeInTheDocument();

    const exclamationMark = screen.queryByRole("img", {
      name: "error",
    });
    expect(exclamationMark).not.toBeInTheDocument();
  });

  test("error while rendering 'Favorited'", () => {
    let favouriteState = false;

    const toggleFavourite = (favouriteState, finishedCallback) => {
      finishedCallback("error");
    };

    render(
      <FavoriteIcon
        toggleFavourite={toggleFavourite}
        favouriteState={favouriteState}
      />
    );

    const buttonElement = screen.getByRole("button", {
      name: "Add to favorites!",
    });

    fireEvent.click(buttonElement);

    const outputElem = screen.getByText("Add to favorites!");
    expect(outputElem).toBeInTheDocument();

    const exclamationMark = screen.getByRole("img", {
      name: "error",
    });
    expect(exclamationMark).toBeInTheDocument();
  });
});
