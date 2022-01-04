import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Pagination from "./Pagination.tsx";

describe("Paginaton component", () => {
  test("renders page info", () => {
    let activePage = 2;
    const pagesInfo = {
      count: 40,
      pages: 2,
    };
    const setActivePage = (activePageFn) => {
      activePage = activePageFn(activePage);
    };
    render(
      <Pagination
        activePage={activePage}
        pagesInfo={pagesInfo}
        setActivePage={setActivePage}
      />
    );

    const buttonElements = screen.getAllByRole("listitem");

    expect(buttonElements).toHaveLength(2);
  });
});
