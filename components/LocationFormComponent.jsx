import { useState } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Link from "next/link";

function LocationFormComponent({ submitHandler, initialData }) {
  const [name, setName] = useState(initialData.name || "");
  const [dimension, setDimension] = useState(initialData.dimension || "");
  const [type, setType] = useState(initialData.type || "");
  const [id, setId] = useState(initialData.id);

  const handleName = (e) => setName(e.target.value);
  const handleDimension = (e) => setDimension(e.target.value);
  const handleType = (e) => setType(e.target.value);

  function submitFunction(e) {
    e.preventDefault();
    submitHandler({ id, name, dimension, type });
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
          placeholder="Dimension"
          value={dimension}
          onChange={handleDimension}
          required
        />
        <FormControl
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Type"
          value={type}
          onChange={handleType}
          required
        />
        <div className="flex flex-row p-2">
          <Link href="/locations">
            <Button variant="btn btn-outline-danger  w-1/2 mr-2">Back</Button>
          </Link>

          <Button variant="btn btn-outline-success w-1/2" type="submit">
            {!initialData ? "Add new location!" : "Update location"}
          </Button>
        </div>
      </div>
    </form>
  );
}
export default LocationFormComponent;
