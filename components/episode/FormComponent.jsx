import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Link from "next/link";
import { Form } from "react-bootstrap";

function FormComponent({ submitHandler, initialData }) {
  const [name, setName] = useState(initialData.name || "");
  const [air_date, setAirDate] = useState(initialData.air_date || "");
  const [episodeDesc, setEpisodeDesc] = useState(initialData.episode || "");
  const [id, setId] = useState(initialData.id);

  const handleName = (e) => setName(e.target.value);
  const handleAirDate = (e) => {
    setAirDate(e.target.value);
  };
  const handleEpisodeDesc = (e) => setEpisodeDesc(e.target.value);

  function submitFunction(e) {
    e.preventDefault();
    submitHandler({ name, air_date, episodeDesc });
  }

  return (
    <form onSubmit={submitFunction}>
      <div className="flex flex-col gap-y-2">
        <FormControl
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Name"
          value={name}
          onChange={handleName}
          required
        />
        <FormControl
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Air Date"
          value={air_date}
          onChange={handleAirDate}
          required
          type="date"
        />
        <FormControl
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Episode"
          value={episodeDesc}
          onChange={handleEpisodeDesc}
          required
        />
        <div className="flex flex-row p-2">
          <Link href="/episodes">
            <Button variant="btn btn-outline-danger  w-1/2 mr-2">Back</Button>
          </Link>

          <Button variant="btn btn-outline-success w-1/2" type="submit">
            {!initialData ? "Add new episode!" : "Update episode"}
          </Button>
        </div>
      </div>
    </form>
  );
}
export default FormComponent;
