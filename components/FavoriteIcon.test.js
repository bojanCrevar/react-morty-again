import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import FavoriteIcon from "./FavoriteIcon.tsx";

jest.mock("axios");

describe("FavoriteIcon component", () => {
  test("render Favorited on screen", () => {
    let favouriteState = false;
    const toggleFavourite = (favouriteState, finishedCallback) => {
      try {
        // const characters = {
        //   id: 1,
        //   name: "Rick",
        //   image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        //   species: "Human",
        //   gender: "Male",
        //   status: "Alive",
        //   location: "Citadel of Ricks",
        //   favourite: favouriteState,
        // };
        // const response = { data: characters };

        // axios.put.mockResolvedValue(response);

        rerender(
          <FavoriteIcon
            toggleFavourite={toggleFavourite}
            favouriteState={favouriteState}
          />
        );
        finishedCallback();
      } catch (e) {
        finishedCallback(e);
      }
    };
    const { rerender } = render(
      <FavoriteIcon
        toggleFavourite={toggleFavourite}
        favouriteState={favouriteState}
      />
    );

    const buttonElement = screen.getByRole("button", {
      name: "Add to favorites!",
    });

    fireEvent.click(buttonElement);
    //await waitFor(() => screen.findByText("Favorited"));

    const outputElem = screen.getByText("Favorited");
    expect(outputElem).toBeInTheDocument();
  });
});
