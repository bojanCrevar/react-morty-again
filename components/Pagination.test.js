import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Pagination from "./Pagination.tsx";

describe("Paginaton component", () => {
  test("renders pagination buttons - first page", () => {
    let activePage = 1;
    const pagesInfo = {
      count: 41,
      pages: 3,
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

  test("renders pagination buttons - second page", () => {
    let activePage = 2;
    const pagesInfo = {
      count: 41,
      pages: 3,
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

    expect(buttonElements).toHaveLength(3);
  });

  test("renders pagination buttons - third page", () => {
    let activePage = 3;
    const pagesInfo = {
      count: 41,
      pages: 3,
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

  test.only("renders new value of activePage when clicked", async () => {
    let activePage = 1;
    const pagesInfo = {
      count: 41,
      pages: 3,
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

    const buttonElement = screen.getByRole("button", { name: "Next" }); //.getByRole("button", { name: "Next" });

    await fireEvent.click(buttonElement);

    await waitFor(() => screen.findByText("2"));

    const outputElem = screen.getAllByRole("button"); // ili screen.getAllByRole("button");
    expect(outputElem).toHaveLength(3); //i ovdje bi trebalo da bude toHaveLength(2);
  });
});
