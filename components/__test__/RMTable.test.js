import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RMTable from "../RMTable";

describe("RMTable component test", () => {
  let tableData;
  let columnCfg;

  beforeEach(() => {
    tableData = [
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
    columnCfg = [
      { key: "name", title: "Name" },
      { key: "dimension", title: "Dimension" },
      { key: "type", title: "Type" },
      {
        key: "charactersString",
        title: "Residents"
      },
    ];
  });
  test("rendering all rows", () => {
    render(<RMTable tableData={tableData} columnConfig={columnCfg} />);

    const rowsElements = screen.getAllByRole("row");
    expect(rowsElements).toHaveLength(4);
  });

  test("Showing update button when hovered", () => {
    render(<RMTable tableData={tableData} columnConfig={columnCfg} />);

    let rowElement = screen.getByRole("row", {
      name: "Earth C-2 Planet Rick, Morty",
    });
    expect(rowElement).toBeInTheDocument();

    userEvent.hover(rowElement);

    expect(rowElement.getElementsByClassName("fa-edit visible")).toHaveLength(
      1
    );
  });

  test("Getting elements with class invisible which are not hovered", () => {
    const { container } = render(
      <RMTable tableData={tableData} columnConfig={columnCfg} />
    );

    let rowElement = screen.getByRole("row", {
      name: "Earth C-2 Planet Rick, Morty",
    });

    userEvent.hover(rowElement);

    expect(container.getElementsByClassName("invisible").length).toBe(2);
  });
});
