import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SortComponent from "../SortComponent";

describe("sort tests", () => {
  let sort;
  let setSort;
  beforeEach(() => {
    sort = "date_asc";
    setSort = jest.fn(() => {});
  });

  it("should be 4 sort-by options", () => {
    render(<SortComponent setSort={setSort} initSort={sort} />);

    expect(screen.getAllByRole("option").length).toBe(4);
  });

  it("should be sort-by set by default on Date (asc)", () => {
    render(<SortComponent setSort={setSort} initSort={sort} />);

    const outputElem = screen.getByDisplayValue("Date (asc)");

    expect(outputElem).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Date (asc)" }).selected).toBe(
      true
    );
  });

  it("should be possible to change sort-by selection", () => {
    render(<SortComponent setSort={setSort} initSort={sort} />);
    const select = screen.getByTestId("select");

    userEvent.selectOptions(select, screen.getByTestId("asc"));

    expect(screen.getAllByRole("option")[2].selected).toBe(true);
  });
});
