import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Searchbar from "../Searchbar";

describe("Searchbar component test", () => {
  test("render Searchbar on screen", () => {
    let setKeyword;
    let setActivePage;
    let activePage;
    let keyword;

    keyword = "Rick";
    setActivePage = (activeArg) => (activePage = activeArg);

    setKeyword = (keyword) => {
      keyword = keyword;

      rerender(
        <Searchbar
          setKeyword={setKeyword}
          setActivePage={setActivePage}
          initKeyword={keyword}
        />
      );
    };

    const { rerender } = render(
      <Searchbar
        setKeyword={setKeyword}
        setActivePage={setActivePage}
        initKeyword={keyword}
      />
    );

    const buttonElement = screen.getByRole("button", {
      name: "Search",
    });

    fireEvent.click(buttonElement);

    const outputElem = screen.getByDisplayValue("Rick");
    expect(outputElem).toBeInTheDocument();
  });
});
