import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import Pagination from "../Pagination.tsx";
import store from "../../store";
import { paginationActions } from "../../store/pagination-slice";

describe("Paginaton component", () => {
  let pagesInfo;

  beforeEach(() => {
    pagesInfo = {
      count: 41,
      pages: 3,
    };
  });

  test("renders pagination buttons - first page", () => {
    let activePage = 1;

    store.dispatch(paginationActions.setActivePage(activePage));

    render(
      <Provider store={store}>
        <Pagination pagesInfo={pagesInfo} />
      </Provider>
    );

    const buttonElements = screen.getAllByRole("listitem");

    expect(buttonElements).toHaveLength(2);
  });

  test("renders pagination buttons - second page", () => {
    let activePage = 2;

    store.dispatch(paginationActions.setActivePage(activePage));
    render(
      <Provider store={store}>
        <Pagination pagesInfo={pagesInfo} />
      </Provider>
    );

    const buttonElements = screen.getAllByRole("listitem");

    expect(buttonElements).toHaveLength(3);
  });

  test("renders pagination buttons - third page", () => {
    let activePage = 3;

    store.dispatch(paginationActions.setActivePage(activePage));

    render(
      <Provider store={store}>
        <Pagination pagesInfo={pagesInfo} />
      </Provider>
    );

    const buttonElements = screen.getAllByRole("listitem");

    expect(buttonElements).toHaveLength(2);
  });

  test("renders new value of activePage when clicked", async () => {
    let activePage = 1;

    store.dispatch(paginationActions.setActivePage(activePage));

    const { rerender } = render(
      <Provider store={store}>
        <Pagination pagesInfo={pagesInfo} />
      </Provider>
    );

    const buttonElement = screen.getByRole("button", { name: "Next" });

    fireEvent.click(buttonElement);

    await waitFor(() => screen.findByText("2"));
    expect(store.getState().pagination.activePage).toEqual(2);

    const outputElem = screen.getAllByRole("button");
    expect(outputElem).toHaveLength(3);
  });
});
