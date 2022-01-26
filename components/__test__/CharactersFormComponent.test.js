import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { debug } from "console";
import FormComponent from "../characters/FormComponent";

describe("Characters FormComponent test", () => {
  test("Check if creating new character button is rendered", () => {
    let initialData = {
      gender: "",
      id: -55,
      image: "",
      name: "",
      species: "",
      location: {
        name: "",
      },
    };
    const submitHandler = () => {};
    render(
      <FormComponent initialData={initialData} submitHandler={submitHandler} />
    );

    const outputElem = screen.getByText("Add new character!", { exact: false });
    expect(outputElem).toBeInTheDocument();
  });

  test("Check if updating character button is rendered", () => {
    let initialData = {
      gender: "Male",
      id: 1,
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      name: "Rick",
      species: "Human",
      location: {
        name: "Earth",
      },
    };
    const submitHandler = () => {};
    render(
      <FormComponent initialData={initialData} submitHandler={submitHandler} />
    );

    const outputElem = screen.getByText("Update character", { exact: false });
    expect(outputElem).toBeInTheDocument();
  });

  test("Checking if button gets enabled after entering correct values and submiting form", async () => {
    let initialData = {
      gender: "",
      id: -55,
      image: "",
      name: "",
      species: "",
      location: {
        name: "",
      },
    };
    const submitHandler = jest.fn();
    render(
      <FormComponent initialData={initialData} submitHandler={submitHandler} />
    );

    const inputName = screen.getByTestId("name");
    fireEvent.change(inputName, { target: { value: "Rick" } });
    expect(inputName.value).toBe("Rick");

    const inputStatus = screen.getByTestId("status_Dead");
    fireEvent.click(inputStatus);
    expect(inputStatus).toBeChecked();

    const inputGender = screen.getByTestId("gender");
    fireEvent.change(inputGender, { target: { value: "unknown" } });
    expect(inputGender.value).toBe("unknown");

    const inputSpecies = screen.getByTestId("species");
    fireEvent.change(inputSpecies, { target: { value: "Human" } });
    expect(inputSpecies.value).toBe("Human");

    const inputLoc = screen.getByTestId("locationName");
    fireEvent.change(inputLoc, { target: { value: "Slovenija" } });
    expect(inputLoc.value).toBe("Slovenija");

    const inputImg = screen.getByTestId("image");
    fireEvent.change(inputImg, {
      target: {
        value: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      },
    });
    expect(inputImg.value).toBe(
      "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
    );

    fireEvent.click(screen.getByTestId("submit"));

    await waitFor(() => {
      expect(submitHandler).toHaveBeenCalledTimes(1);

      expect(submitHandler).toBeCalledWith({
        id: -55,
        name: "Rick",
        status: "Dead",
        gender: "unknown",
        species: "Human",
        location: { name: "Slovenija" },
        locationName: "Slovenija",
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      });
    });
  });

  test("Checking if button is disabled when entering wrong values", async () => {
    let initialData = {
      gender: "",
      id: -55,
      image: "",
      name: "",
      species: "",
      location: {
        name: "",
      },
    };
    const submitHandler = jest.fn();
    render(
      <FormComponent initialData={initialData} submitHandler={submitHandler} />
    );

    const inputName = screen.getByTestId("name");
    fireEvent.change(inputName, { target: { value: "Rick" } });
    expect(inputName.value).toBe("Rick");

    const inputStatus = screen.getByTestId("status_Dead");
    fireEvent.click(inputStatus);
    expect(inputStatus).toBeChecked();

    const inputGender = screen.getByTestId("gender");
    fireEvent.change(inputGender, { target: { value: "unknown" } });
    expect(inputGender.value).toBe("unknown");

    const inputSpecies = screen.getByTestId("species");
    fireEvent.change(inputSpecies, { target: { value: "Human" } });
    expect(inputSpecies.value).toBe("Human");

    const inputLoc = screen.getByTestId("locationName");
    fireEvent.change(inputLoc, { target: { value: "Slovenija" } });
    expect(inputLoc.value).toBe("Slovenija");

    await waitFor(() => {
      expect(submitHandler).toHaveBeenCalledTimes(0);
    });

    expect(screen.getByTestId("submit")).toBeDisabled();
  });
});
