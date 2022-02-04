import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MultipleSelect from "../MultipleSelect";

describe("Testing MultipleSelect", () => {
  test("rendering create button in form component", () => {
    let onChange;
    let value = [
      "https://rickandmortyapi.com/api/character/38",
      "https://rickandmortyapi.com/api/character/45",
    ];

    onChange = jest.fn();

    const { rerender } = render(
      <MultipleSelect name="characters" onChange={onChange} value={value} />
    );

    screen.debug();

    const multiSelect = screen.getByRole("combobox");

    expect(multiSelect).toBeInTheDocument();
  });
});
