import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SortComponent from "../SortComponent";

describe("sort tests", () => {
  let sort;
  let setSort;
  beforeEach(() => {
    sort = "id";
    setSort = jest.fn(() => {});
  });

  it("should be 3 sort-by options", () => {
    render(<SortComponent setSort={setSort} initSort={sort} />);

    expect(screen.getAllByRole("option").length).toBe(3);
  });

  it("should be sort-by set by default on ID", () => {
    render(<SortComponent setSort={setSort} initSort={sort} />);

    const outputElem = screen.getByDisplayValue("ID");

    expect(outputElem).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "ID" }).selected).toBe(true);
  });

  it("should be possible to change sort-by selection", () => {
    render(<SortComponent setSort={setSort} initSort={sort} />);
    const select = screen.getByTestId("select");

    userEvent.selectOptions(select, screen.getByTestId("asc"));

    expect(screen.getAllByRole("option")[1].selected).toBe(true);
  });
});
