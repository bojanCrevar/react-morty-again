import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LocationsFormComponent from "../locations/FormComponent";

describe("Testing Locations Form Component", () => {
  test("rendering create form component", () => {
    let initialData = { id: -2, name: "", dimension: "", type: "" };
    const submitHandler = ({ id, name, dimension, type }) => {};
    render(
      <LocationsFormComponent
        initialData={initialData}
        submitHandler={submitHandler}
      />
    );

    const outputElem = screen.getByText("Add new location", { exact: false });
    expect(outputElem).toBeInTheDocument();
  });

  test("rendering update form component", () => {
    let initialData = {
      id: 10,
      name: "Earth",
      dimension: "C-34",
      type: "Planet",
    };
    const submitHandler = ({ id, name, dimension, type }) => {};
    render(
      <LocationsFormComponent
        initialData={initialData}
        submitHandler={submitHandler}
      />
    );

    const outputElem = screen.getByText("Update location");
    expect(outputElem).toBeInTheDocument();
  });

  test.only("creating new location", async () => {
    let initialData = { id: -2, name: "", dimension: "", type: "" };
    const submitHandler = jest.fn(() => console.log("usao sam"));

    render(
      <LocationsFormComponent
        initialData={initialData}
        submitHandler={submitHandler}
      />
    );

    const locName = screen.getByPlaceholderText("Location's name");
    fireEvent.change(locName, { target: { value: "Earth-23" } });
    expect(locName.value).toBe("Earth-23");

    const dimension = screen.getByPlaceholderText("Dimension");
    fireEvent.change(dimension, { target: { value: "C-23" } });
    expect(dimension.value).toBe("C-23");

    const type = screen.getByPlaceholderText("Type");
    fireEvent.change(type, { target: { value: "Planet" } });
    expect(type.value).toBe("Planet");

    fireEvent.click(screen.getByRole("button", { name: "Add new location!" }));

    await new Promise((r) => setTimeout(r, 200));
    expect(submitHandler).toHaveBeenCalledTimes(1);
  });
});
