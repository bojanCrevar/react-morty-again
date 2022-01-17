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
    setActivePage = jest.fn((activeArg) => (activePage = activeArg));

    setKeyword = jest.fn((keyword) => {
      keyword = keyword;
    });

    render(
      <Searchbar
        setKeyword={setKeyword}
        setActivePage={setActivePage}
        initKeyword={keyword}
      />
    );

    const outputElem = screen.getByDisplayValue("Rick");

    const buttonElement = screen.getByRole("button", {
      name: "Search",
    });

    fireEvent.click(buttonElement);

    expect(outputElem).toBeInTheDocument();
    expect(setKeyword).toHaveBeenCalledWith(keyword);
    expect(setActivePage).toHaveBeenCalledWith(1);
  });
});
