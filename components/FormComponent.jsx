import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Link from "next/link";

function FormComponent({ submitHandler, initialData }) {
  const [name, setName] = useState(initialData.name || "");
  const [status, setStatus] = useState(initialData.status || "");
  const [gender, setGender] = useState(initialData.gender || "");
  const [species, setSpecies] = useState(initialData.species || "");
  const [location, setLocation] = useState(initialData.location?.name || "");
  const [id, setId] = useState(initialData.id);

  const handleName = (e) => setName(e.target.value);
  const handleStatus = (e) => setStatus(e.target.value);
  const handleGender = (e) => setGender(e.target.value);
  const handleSpecies = (e) => setSpecies(e.target.value);
  const handleLocation = (e) => setLocation(e.target.value);

  function submitFunction(e) {
    e.preventDefault();
    submitHandler({ id, name, status, gender, species, location });
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
          placeholder="Status"
          value={status}
          onChange={handleStatus}
          required
        />
        <FormControl
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Gender"
          value={gender}
          onChange={handleGender}
          required
        />
        <FormControl
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Species"
          value={species}
          onChange={handleSpecies}
          required
        />
        <FormControl
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Location"
          value={location}
          onChange={handleLocation}
          required
        />
        <div className="flex flex-row p-2">
          <Link href="/characters">
            <Button variant="btn btn-outline-danger  w-1/2 mr-2">Back</Button>
          </Link>

          <Button variant="btn btn-outline-success w-1/2" type="submit">
            {!initialData ? "Add new character!" : "Update character"}
          </Button>
        </div>
      </div>
    </form>
  );
}
export default FormComponent;
