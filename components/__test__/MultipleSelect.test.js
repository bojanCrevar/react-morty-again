import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MultipleSelect from "../MultipleSelect";
import axios from "axios";

jest.mock("axios");

describe("Testing MultipleSelect", () => {
  test("rendering multiselect", () => {
    let onChange;
    let value = [
      "https://rickandmortyapi.com/api/character/38",
      "https://rickandmortyapi.com/api/character/45",
    ];

    onChange = jest.fn();

    render(
      <MultipleSelect name="characters" onChange={onChange} value={value} />
    );

    screen.debug();

    const multiSelect = screen.getByRole("combobox");

    expect(multiSelect).toBeInTheDocument();
  });

  it("testing backend call", async () => {
    // given
    const users = [
      { id: 1, name: "John" },
      { id: 2, name: "Andrew" },
    ];
    axios.get.mockResolvedValueOnce(users);

    // when
    const result = await fetchUsers();

    // then
    expect(axios.get).toHaveBeenCalled();
    //expect(result).toEqual(users);
  });
});

//check if onchange is called on selection Change
//on first load check if axios was called once with empty init values and twice with init initValues
//check if backend was called when filtering input with IDs
