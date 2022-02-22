import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RMTable from "../RMTable";
import { ActionContext } from "../../context/ActionContext";
import { Provider } from "react-redux";
import store from "../../store/index";
import * as redux from "react-redux";

describe("RMTable component test", () => {
  const handleUpdate = jest.fn();
  const handleDelete = jest.fn();
  let spy;
  const tableData = [
    {
      id: 1,
      name: "Earth",
      dimension: "C-2",
      type: "Planet",
      charactersString: "Rick, Morty",
    },
    {
      id: 2,
      name: "Earth c-54",
      dimension: "C-54",
      type: "Planetoid",
      charactersString: "Morty",
    },
    {
      id: 3,
      name: "Earth c-1",
      dimension: "C1",
      type: "Planet",
      charactersString: "Rick",
    },
  ];
  const columnCfg = [
    { key: "name", title: "Name" },
    { key: "dimension", title: "Dimension" },
    { key: "type", title: "Type" },
    {
      key: "charactersString",
      title: "Residents",
    },
  ];
  beforeEach(() => {
    spy = jest.spyOn(redux, "useSelector");
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("rendering all rows", () => {
    render(
      <Provider store={store}>
        <RMTable tableData={tableData} columnConfig={columnCfg} />
      </Provider>
    );

    const rowsElements = screen.getAllByRole("row");

    expect(rowsElements).toHaveLength(4);
  });

  test("Showing update and delete button when hovered", () => {
    spy.mockReturnValue({ isAuthenticated: true });

    render(
      <Provider store={store}>
        <ActionContext.Provider value={{ handleUpdate, handleDelete }}>
          <RMTable tableData={tableData} columnConfig={columnCfg} />
        </ActionContext.Provider>
      </Provider>
    );

    let rowElement = screen.getByRole("row", {
      name: "Earth C-2 Planet Rick, Morty",
    });
    expect(rowElement).toBeInTheDocument();

    userEvent.hover(rowElement);

    expect(rowElement.getElementsByClassName("fa-edit visible")).toHaveLength(
      1
    );

    expect(
      rowElement.getElementsByClassName("fa-trash-alt visible")
    ).toHaveLength(1);
  });

  test("Getting elements with class invisible which are not hovered", () => {
    spy.mockReturnValue({ isAuthenticated: true });

    const { container } = render(
      <Provider store={store}>
        <ActionContext.Provider value={{ handleUpdate, handleDelete }}>
          <RMTable tableData={tableData} columnConfig={columnCfg} />
        </ActionContext.Provider>
      </Provider>
    );

    let rowElement = screen.getByRole("row", {
      name: "Earth C-2 Planet Rick, Morty",
    });

    userEvent.hover(rowElement);

    expect(container.getElementsByClassName("invisible").length).toBe(4);
  });

  test("Doesn't render update and delete buttons when hovering, because user is not logged in", () => {
    render(
      <Provider store={store}>
        <ActionContext.Provider value={{ handleUpdate, handleDelete }}>
          <RMTable tableData={tableData} columnConfig={columnCfg} />
        </ActionContext.Provider>
      </Provider>
    );

    let rowElement = screen.getByRole("row", {
      name: "Earth C-2 Planet Rick, Morty",
    });
    expect(rowElement).toBeInTheDocument();

    userEvent.hover(rowElement);

    expect(rowElement.getElementsByClassName("fa-edit visible")).toHaveLength(
      0
    );
    expect(
      rowElement.getElementsByClassName("fa-trash-alt visible")
    ).toHaveLength(0);
  });
});
