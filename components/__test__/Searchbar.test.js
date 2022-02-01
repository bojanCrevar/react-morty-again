import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Searchbar from "../Searchbar";

describe("Searchbar component test", () => {
  test("render Searchbar on screen", () => {
    let setKeyword;
    let setActivePage;
    let activePage;
    let keyword;
    let setSubmitButtonClick;

    keyword = "";
    setActivePage = jest.fn((activeArg) => (activePage = activeArg));

    setKeyword = jest.fn((keyword) => {
      keyword = keyword;
    });

    setSubmitButtonClick = jest.fn();

    render(
      <Searchbar
        setKeyword={setKeyword}
        setActivePage={setActivePage}
        initKeyword={keyword}
        setSubmitButtonClick={setSubmitButtonClick}
      />
    );

    const input = screen.getByTestId("keywordInput");
    fireEvent.change(input, { target: { value: "Rick" } });

    const buttonElement = screen.getByRole("button", {
      name: "Search",
    });

    fireEvent.click(buttonElement);

    expect(input.value).toBe("Rick");
    expect(setSubmitButtonClick).toHaveBeenCalled();
    expect(setKeyword).toHaveBeenCalledWith("Rick");
    expect(setActivePage).toHaveBeenCalledWith(1);
  });
});
