import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Searchbar from "../Searchbar";
import store from "../../store";

describe("Searchbar component test", () => {
  test("render Searchbar on screen", () => {
    let keyword;
    let triggerSearch;

    keyword = "";
    triggerSearch = jest.fn();

    render(
      <Provider store={store}>
        <Searchbar initKeyword={keyword} triggerSearch={triggerSearch} />
      </Provider>
    );

    const input = screen.getByTestId("keywordInput");
    expect(input.value).toBe("");

    fireEvent.change(input, { target: { value: "Rick" } });
    expect(input.value).toBe("Rick");
    expect(store.getState().filter.keyword).toEqual("Rick");

    const buttonElement = screen.getByRole("button", {
      name: "Search",
    });
    fireEvent.click(buttonElement);

    expect(triggerSearch).toHaveBeenCalled();

    const clearButton = screen.getByRole("button", { name: "Clear" });
    fireEvent.click(clearButton);

    expect(input.value).toBe("");
    expect(triggerSearch).toHaveBeenCalled();
  });
});
