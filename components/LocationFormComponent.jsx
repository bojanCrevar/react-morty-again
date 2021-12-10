import { useState } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Link from "next/link";

function LocationFormComponent({ submitHandler, initialData }) {
  const [name, setName] = useState(initialData.name || "");
  const [dimension, setDimension] = useState(initialData.dimension || "");
  const [type, setType] = useState(initialData.type || "");

  const isFormValid = name && dimension && type && name.length > 3;

  const [id, setId] = useState(initialData.id);
  const [touchedName, setTouchedName] = useState(false);
  const [touchedDimension, setTouchedDimension] = useState(false);
  const [touchedType, setTouchedType] = useState(false);

  const handleName = (e) => setName(e.target.value);
  const handleDimension = (e) => setDimension(e.target.value);
  const handleType = (e) => setType(e.target.value);

  function submitFunction(e) {
    e.preventDefault();
    submitHandler({ id, name, dimension, type });
  }

  return (
    <form onSubmit={submitFunction} novalidate>
      <div className="flex flex-col gap-y-2">
        <div className={touchedName ? "was-validated" : ""}>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Name"
            value={name}
            onChange={handleName}
            onBlur={() => setTouchedName(true)}
            minLength="3"
            required
          />
          <div className="invalid-feedback">
            {!name
              ? "Please enter a name!"
              : name.length < 3
              ? "Name must have at least three characters!"
              : ""}
          </div>
        </div>

        <div className={touchedDimension ? "was-validated" : ""}>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Dimension"
            value={dimension}
            onChange={handleDimension}
            onBlur={() => setTouchedDimension(true)}
            required
          />
          <div className="invalid-feedback">Please enter a dimension!</div>
        </div>
        <div className={touchedType ? "was-validated" : ""}>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Type"
            value={type}
            onChange={handleType}
            onBlur={() => setTouchedType(true)}
            required
          />
          <div className="invalid-feedback">Please enter a type!</div>
        </div>
        <div className="flex flex-row p-2">
          <Link href="/locations">
            <Button variant="btn btn-outline-danger  w-1/2 mr-2">Back</Button>
          </Link>

          <Button
            variant="btn btn-outline-success w-1/2"
            type="submit"
            disabled={!isFormValid}
          >
            {!initialData ? "Add new location!" : "Update location"}
          </Button>
        </div>
      </div>
    </form>
  );
}
export default LocationFormComponent;