import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import Pagination from "../Pagination.tsx";
import store from "../../store";

describe("Paginaton component", () => {
  let activePage;
  let pagesInfo;
  let setActivePage;

  beforeEach(() => {
    pagesInfo = {
      count: 41,
      pages: 3,
    };
    setActivePage = (activePageFn) => {
      activePage = activePageFn(activePage);
    };
  });

  test("renders pagination buttons - first page", () => {
    activePage = 1;

    render(
      <Provider store={store}>
        <Pagination
          activePage={activePage}
          pagesInfo={pagesInfo}
          setActivePage={setActivePage}
        />
      </Provider>
    );

    const buttonElements = screen.getAllByRole("listitem");

    expect(buttonElements).toHaveLength(2);
  });

  test("renders pagination buttons - second page", () => {
    let activePage = 2;

    render(
      <Provider store={store}>
        <Pagination
          activePage={activePage}
          pagesInfo={pagesInfo}
          setActivePage={setActivePage}
        />
      </Provider>
    );

    const buttonElements = screen.getAllByRole("listitem");

    expect(buttonElements).toHaveLength(3);
  });

  test("renders pagination buttons - third page", () => {
    let activePage = 3;

    render(
      <Provider store={store}>
        <Pagination
          activePage={activePage}
          pagesInfo={pagesInfo}
          setActivePage={setActivePage}
        />
      </Provider>
    );

    const buttonElements = screen.getAllByRole("listitem");

    expect(buttonElements).toHaveLength(2);
  });

  test("renders new value of activePage when clicked", async () => {
    let activePage = 1;

    setActivePage = (activePageFn) => {
      activePage = activePageFn(activePage);
      rerender(
        <Provider store={store}>
          <Pagination
            activePage={activePage}
            pagesInfo={pagesInfo}
            setActivePage={setActivePage}
          />
        </Provider>
      );
    };

    const { rerender } = render(
      <Provider store={store}>
        <Pagination
          activePage={activePage}
          pagesInfo={pagesInfo}
          setActivePage={setActivePage}
        />
      </Provider>
    );

    const buttonElement = screen.getByRole("button", { name: "Next" });

    fireEvent.click(buttonElement);

    await waitFor(() => screen.findByText("2"));

    const outputElem = screen.getAllByRole("button");
    expect(outputElem).toHaveLength(3);
  });
});
