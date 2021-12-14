import { useState } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Link from "next/link";
import Form from "react-bootstrap/Form";

function FormComponent({ submitHandler, initialData }) {
  const [name, setName] = useState(initialData.name || "");
  const [status, setStatus] = useState(initialData.status || "");
  const [gender, setGender] = useState(initialData.gender || "");
  const [species, setSpecies] = useState(initialData.species || "");
  const [location, setLocation] = useState(initialData.location?.name || "");
  const [image, setImage] = useState(initialData.image || "");
  const [id, setId] = useState(initialData.id);

  const [touchedName, setTouchedName] = useState(false);
  const [touchedStatus, setTouchedStatus] = useState(false);
  const [touchedGender, setTouchedGender] = useState(false);
  const [touchedSpecies, setTouchedSpecies] = useState(false);
  const [touchedLocation, setTouchedLocation] = useState(false);
  const [touchedImage, setTouchedImage] = useState(false);

  const [validURL, setValidURL] = useState(true);

  const isFormValid =
    name && status && gender && species && location && image && validURL;

  const handleName = (e) => setName(e.target.value);
  const handleStatus = (e) => setStatus(e.target.value);
  const handleGender = (e) => setGender(e.target.value);
  const handleSpecies = (e) => setSpecies(e.target.value);
  const handleLocation = (e) => setLocation(e.target.value);
  const handleImage = (e) => setImage(e.target.value);

  function submitFunction(e) {
    e.preventDefault();
    submitHandler({ id, name, status, gender, species, location, image });
  }

  function isValidURL(string) {
    var res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );

    return res !== null;
  }

  return (
    <form onSubmit={submitFunction} noValidate>
      <div className="flex flex-col gap-y-2 ">
        <div className={touchedName ? "was-validated" : ""}>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Name"
            value={name}
            onBlur={() => setTouchedName(true)}
            minLength="3"
            onChange={handleName}
            required
          />
          <div className="invalid-feedback">
            {!name ? "Please enter a name!" : ""}
          </div>
        </div>

        <div className={touchedStatus ? "was-validated" : ""}>
          <div className="pt-2 pb-2">
            {["Alive", "Dead", "Unknown"].map((type) => (
              <Form.Check
                key={type}
                inline
                label={type}
                name="group1"
                type="radio"
                id={`inline-radio-${type}`}
                value={type}
                onBlur={() => setTouchedStatus(true)}
                defaultChecked={type === status ? true : false}
                onChange={handleStatus}
              />
            ))}
          </div>
        </div>

        <div className={touchedGender ? "was-validated" : ""}>
          <Form.Select
            onChange={handleGender}
            defaultValue={gender}
            onBlur={() => setTouchedGender(true)}
          >
            {["Male", "Female", "Genderless", "unknown"].map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </Form.Select>
        </div>

        <div className={touchedSpecies ? "was-validated" : ""}>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Species"
            value={species}
            onChange={handleSpecies}
            onBlur={() => setTouchedSpecies(true)}
            required
          />
          <div className="invalid-feedback">
            {!species ? "Please enter the species!" : ""}
          </div>
        </div>

        <div className={touchedLocation ? "was-validated" : ""}>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Location"
            value={location}
            onChange={handleLocation}
            onBlur={() => setTouchedLocation(true)}
            required
          />
          <div className="invalid-feedback">
            {!location ? "Please enter the location!" : ""}
          </div>
        </div>

        <div className={touchedImage ? "was-validated" : ""}>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Image URL"
            value={image}
            onBlur={() => {
              setTouchedImage(true);
              setValidURL(isValidURL(image));
            }}
            pattern="(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)"
            onChange={handleImage}
            required
          />
          <div className="invalid-feedback">
            {!image
              ? "Please enter the location!"
              : !validURL
              ? "Enter a valid URL!"
              : null}
          </div>
        </div>

        <div className="flex flex-row p-2">
          <Link href="/characters">
            <Button variant="btn btn-outline-danger  w-1/2 mr-2">Back</Button>
          </Link>

          <Button
            variant="btn btn-outline-success w-1/2"
            type="submit"
            disabled={!isFormValid}
          >
            {!initialData ? "Add new character!" : "Update character"}
          </Button>
        </div>
      </div>
    </form>
  );
}
export default FormComponent;
