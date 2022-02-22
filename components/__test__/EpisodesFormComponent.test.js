import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { emptyEpisodeItem } from "../../model/episodeModel";
import FormComponent from "../episodes/FormComponent";
import mockAxios from "jest-mock-axios";

describe.only("Episode FormComponent tests", () => {
  const submitHandler = jest.fn();
  let initialData = {
    id: 4,
    name: "Rick In An Old Episode",
    air_date: "2015-08-09",
    episode: "S01E02",
    characters: [],
  };
  afterEach(() => {
    mockAxios.reset();
  });
  beforeEach(() => {
    mockAxios.get.mockResolvedValue({ data: { exists: false }, response: 200 });
  })
  it("shoud be a 'Create episode' button on the page", () => {
    render(
      <FormComponent
        submitHandler={submitHandler}
        initialData={emptyEpisodeItem}
      />
    );

    const outputElem = screen.getByText("Create episode", {
      exact: true,
    });
    expect(outputElem).toBeInTheDocument();
  });

  it("shoud be a 'Update episode' button on the page", () => {
    render(
      <FormComponent submitHandler={submitHandler} initialData={initialData} />
    );

    const outputElem = screen.getByText("Update episode", {
      exact: true,
    });
    expect(outputElem).toBeInTheDocument();
  });

  it("should contain enabled button on the proper input data", async () => {
    render(
      <FormComponent submitHandler={submitHandler} initialData={initialData} />
    );

    let newName = "Rick In A New Episode";
    let newAirDate = "2020-08-09";
    let newEpisode = "S01E22";

    const inputName = screen.getByTestId("name");
    fireEvent.change(inputName, { target: { value: newName } });
    expect(inputName.value).toBe(newName);

    const inputAirDate = screen.getByTestId("air_date");
    fireEvent.change(inputAirDate, { target: { value: newAirDate } });
    expect(inputAirDate.value).toBe(newAirDate);

    const inputEpisode = screen.getByTestId("episode");
    fireEvent.change(inputEpisode, { target: { value: newEpisode } });
    expect(inputEpisode.value).toBe(newEpisode);

    fireEvent.click(screen.getByTestId("button"));

    await waitFor(() => {
      expect(submitHandler).toHaveBeenCalledTimes(1);

      expect(submitHandler).toBeCalledWith({
        id: 4,
        name: newName,
        air_date: newAirDate,
        episode: newEpisode,
        characters: [],
      });
    });
  });

  it("should contain disable button on the wrong input data", async () => {
    render(
      <FormComponent submitHandler={submitHandler} initialData={initialData} />
    );

    let newName = "Rick In A New Episode";
    let newAirDate = "2020-08-09";
    let wrongNewEpisode = "WRONGFORMAT";

    const inputName = screen.getByTestId("name");
    fireEvent.change(inputName, { target: { value: newName } });
    expect(inputName.value).toBe(newName);

    const inputAirDate = screen.getByTestId("air_date");
    fireEvent.change(inputAirDate, { target: { value: newAirDate } });
    expect(inputAirDate.value).toBe(newAirDate);

    const inputEpisode = screen.getByTestId("episode");
    fireEvent.change(inputEpisode, { target: { value: wrongNewEpisode } });
    expect(inputEpisode.value).toBe(wrongNewEpisode);

    fireEvent.click(screen.getByTestId("button"));

    await waitFor(() => {
      expect(screen.getByTestId("button")).toBeDisabled();
    });
  });
});
