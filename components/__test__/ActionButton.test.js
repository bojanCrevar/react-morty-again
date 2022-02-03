import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ActionButton from "../ActionButton";
import { ActionContext } from "../../context/ActionContext";
import React from "react";

describe("Action Button test", () => {
  it("should show 'edit' and 'delete' button", () => {
    let id = 1;
    let hovered = true;

    const handleUpdate = jest.fn();
    const handleDelete = jest.fn();

    render(
      <ActionContext.Provider value={{ handleUpdate, handleDelete }}>
        <ActionButton id={id} hovered={hovered} />
      </ActionContext.Provider>
    );

    const editIcon = screen.getByTestId("editIcon");
    const deleteIcon = screen.getByTestId("deleteIcon");

    expect(editIcon).toBeInTheDocument();
    expect(deleteIcon).toBeInTheDocument();
  });
  it("should show 'edit' but not 'delete' button", () => {
    let id = 1;
    let hovered = true;

    const handleUpdate = jest.fn();
    const handleDelete = null;

    render(
      <ActionContext.Provider value={{ handleUpdate, handleDelete }}>
        <ActionButton id={id} hovered={hovered} />
      </ActionContext.Provider>
    );

    const editIcon = screen.getByTestId("editIcon");
    expect(editIcon).toBeInTheDocument();
    expect(screen.queryByTestId("deleteIcon")).not.toBeInTheDocument();
  });
});
