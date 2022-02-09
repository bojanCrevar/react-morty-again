import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MultipleSelect from "../MultipleSelect";
import axios from "axios";
import mockAxios from "jest-mock-axios";

afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset();
});

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

    const multiSelect = screen.getByRole("combobox");

    expect(multiSelect).toBeInTheDocument();
  });

  describe("fetchData", () => {
    it("should return users list", async () => {
      mockAxios.get.mockResolvedValueOnce(value);

      render(
        <MultipleSelect name="characters" onChange={onChange} value={value} />
      );

      screen.debug();
    });
  });

  describe("check onChange trigger", () => {
    it("should trigger onChange fn", async () => {
      let onChange;
      let value = [
        "https://rickandmortyapi.com/api/character/38",
        "https://rickandmortyapi.com/api/character/45",
      ];

      onChange = jest.fn();

      render(
        <MultipleSelect name="characters" onChange={onChange} value={value} />
      );

      const multiSelect = screen.getByRole("combobox");

      fireEvent.change(multiSelect, {
        target: { value: "https://rickandmortyapi.com/api/character/38" },
      });

      expect(onChange).toHaveBeenCalled();
    });
  });

  /*  describe("add filter input", () => {
    it("should trigger backend filtering", async () => {
      let onChange;
      let value = [
        "https://rickandmortyapi.com/api/character/38",
        "https://rickandmortyapi.com/api/character/45",
      ];

      onChange = jest.fn();

      render(
        <MultipleSelect name="characters" onChange={onChange} value={value} />
      );

      const multiSelect = screen.getByRole("combobox");

      fireEvent.change(multiSelect, {
        target: { value: "Rick" },
      });

      expect(onChange).toHaveBeenCalled();
    });
  }); */
});

//check if onchange is called on selection Change
//on first load check if axios was called once with empty init values and twice with init initValues
//check if backend was called when filtering input with IDs
