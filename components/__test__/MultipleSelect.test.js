import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MultipleSelect from "../MultipleSelect";
import axios from "axios";
import mockAxios from "jest-mock-axios";

describe.only("Testing MultipleSelect", () => {
  let onChange;
  let value;
  let firstCallCharacters;
  let secondCallCharacters;

  beforeEach(() => {
    onChange = jest.fn();
    value = [
      "https://rickandmortyapi.com/api/character/38",
      "https://rickandmortyapi.com/api/character/45",
    ];

    firstCallCharacters = {
      data: {
        characters: [
          {
            id: 38,
            name: "Beth Smith",
            status: "Alive",
            species: "Human",
            type: "",
            gender: "Female",
            origin: {
              name: "Earth (C-137)",
              url: "https://rickandmortyapi.com/api/location/1",
            },
            location: {
              name: "Earth (C-137)",
              url: "https://rickandmortyapi.com/api/location/1",
            },
            image: "https://rickandmortyapi.com/api/character/avatar/38.jpeg",
            episode: [
              "https://rickandmortyapi.com/api/episode/1",
              "https://rickandmortyapi.com/api/episode/2",
              "https://rickandmortyapi.com/api/episode/3",
              "https://rickandmortyapi.com/api/episode/4",
              "https://rickandmortyapi.com/api/episode/5",
              "https://rickandmortyapi.com/api/episode/6",
              "https://rickandmortyapi.com/api/episode/22",
              "https://rickandmortyapi.com/api/episode/51",
            ],
            url: "https://rickandmortyapi.com/api/character/38",
            created: "2017-11-05T09:48:44.230Z",
          },
          {
            id: 45,
            name: "Bill",
            status: "Alive",
            species: "Human",
            type: "",
            gender: "Male",
            origin: {
              name: "Earth (C-137)",
              url: "https://rickandmortyapi.com/api/location/1",
            },
            location: {
              name: "Earth (C-137)",
              url: "https://rickandmortyapi.com/api/location/1",
            },
            image: "https://rickandmortyapi.com/api/character/avatar/45.jpeg",
            episode: ["https://rickandmortyapi.com/api/episode/3"],
            url: "https://rickandmortyapi.com/api/character/45",
            created: "2017-11-05T10:22:27.446Z",
          },
        ],
      },
      status: 200,
    };

    secondCallCharacters = {
      data: {
        results: [
          {
            id: 38,
            name: "Beth Smith",
            status: "Alive",
            species: "Human",
            type: "",
            gender: "Female",
            origin: {
              name: "Earth (C-137)",
              url: "https://rickandmortyapi.com/api/location/1",
            },
            location: {
              name: "Earth (C-137)",
              url: "https://rickandmortyapi.com/api/location/1",
            },
            image: "https://rickandmortyapi.com/api/character/avatar/38.jpeg",
            episode: [
              "https://rickandmortyapi.com/api/episode/1",
              "https://rickandmortyapi.com/api/episode/2",
              "https://rickandmortyapi.com/api/episode/3",
              "https://rickandmortyapi.com/api/episode/4",
              "https://rickandmortyapi.com/api/episode/5",
              "https://rickandmortyapi.com/api/episode/6",
              "https://rickandmortyapi.com/api/episode/22",
              "https://rickandmortyapi.com/api/episode/51",
            ],
            url: "https://rickandmortyapi.com/api/character/38",
            created: "2017-11-05T09:48:44.230Z",
          },
          {
            id: 45,
            name: "Bill",
            status: "Alive",
            species: "Human",
            type: "",
            gender: "Male",
            origin: {
              name: "Earth (C-137)",
              url: "https://rickandmortyapi.com/api/location/1",
            },
            location: {
              name: "Earth (C-137)",
              url: "https://rickandmortyapi.com/api/location/1",
            },
            image: "https://rickandmortyapi.com/api/character/avatar/45.jpeg",
            episode: ["https://rickandmortyapi.com/api/episode/3"],
            url: "https://rickandmortyapi.com/api/character/45",
            created: "2017-11-05T10:22:27.446Z",
          },
        ],
      },
      status: 200,
    };
  });

  afterEach(() => {
    mockAxios.reset();
  });

  test("testing if there is one backend call when init values are not provided to MultipleSelect", async () => {
    mockAxios.get.mockResolvedValueOnce(secondCallCharacters);

    render(<MultipleSelect name="characters" onChange={onChange} />);

    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
    });

    const dropdownButton = screen.getByTitle("M4");
    fireEvent.click(dropdownButton);
  });

  test("testing if there are two backend calls with init values provided to MultipleSelect", async () => {
    mockAxios.get
      .mockResolvedValueOnce(firstCallCharacters)
      .mockResolvedValueOnce(secondCallCharacters);

    render(
      <MultipleSelect name="characters" onChange={onChange} value={value} />
    );

    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledTimes(2);
    });
  });
});

//check if onchange is called on selection Change
//on first load check if axios was called once with empty init values and twice with init initValues
//check if backend was called when filtering input with IDs
