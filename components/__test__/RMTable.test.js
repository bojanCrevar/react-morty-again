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
        properties: {
          name: "Earth",
          dimension: "C-2",
          type: "Planet",
          charactersString: "Rick, Morty",
        },
      },
      {
        id: 2,
        properties: {
          name: "Earth c-54",
          dimension: "C-54",
          type: "Planetoid",
          charactersString: "Morty",
        },
      },
      {
        id: 3,
        properties: {
          name: "Earth c-1",
          dimension: "C1",
          type: "Planet",
          charactersString: "Rick",
        },
      },
    ];
    columnCfg = [
      { key: "name", title: "Name" },
      { key: "dimension", title: "Dimension" },
      { key: "type", title: "Type" },
      {
        key: "charactersString",
        title: "Residents",
        tooltip: "charactersTooltip",
      },
    ];
  });

  test("Showing update button when hovered", () => {
    const { container } = render(
      <RMTable tabledata={tableData} columnconfig={columnCfg} />
    );

    let rowElement = screen.getByRole("row", {
      name: "Earth C-2 Planet Rick, Morty",
    });
    expect(rowElement).toBeInTheDocument();

    userEvent.hover(rowElement);

    expect(container.getElementsByClassName("visible").length).toBe(1);
  });

  test("Getting elements with class invisible which are not hovered", () => {
    const { container } = render(
      <RMTable tabledata={tableData} columnconfig={columnCfg} />
    );

    let rowElement = screen.getByRole("row", {
      name: "Earth C-2 Planet Rick, Morty",
    });

    userEvent.hover(rowElement);

    expect(container.getElementsByClassName("invisible").length).toBe(2);
  });
});
