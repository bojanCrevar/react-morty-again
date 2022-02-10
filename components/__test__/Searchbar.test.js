import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Searchbar from "../Searchbar";
import store from "../../store";

describe("Searchbar component test", () => {
  test("render Searchbar on screen", () => {
    let setActivePage;
    let activePage;
    let keyword;
    let triggerSearch;

    keyword = "";
    setActivePage = jest.fn((activeArg) => (activePage = activeArg));
    triggerSearch = jest.fn();

    render(
      <Provider store={store}>
        <Searchbar
          setActivePage={setActivePage}
          initKeyword={keyword}
          triggerSearch={triggerSearch}
        />
      </Provider>
    );

    const input = screen.getByTestId("keywordInput");
    expect(input.value).toBe("");

    fireEvent.change(input, { target: { value: "Rick" } });
    expect(input.value).toBe("Rick");

    const buttonElement = screen.getByRole("button", {
      name: "Search",
    });
    fireEvent.click(buttonElement);

    expect(triggerSearch).toHaveBeenCalled();
    expect(setActivePage).toHaveBeenCalledWith(1);

    const clearButton = screen.getByRole("button", { name: "Clear" });
    fireEvent.click(clearButton);

    expect(input.value).toBe("");
    expect(triggerSearch).toHaveBeenCalled();
    expect(setActivePage).toHaveBeenCalledWith(1);
  });
});
