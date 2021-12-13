import { useState } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Link from "next/link";
import useEpisodesFormData from "/hooks/useEpisodesFormData";

function FormComponent({ submitHandler, initialData }) {
  const { episodeData, setEpisodeData } = useEpisodesFormData(initialData);

  const [visitedName, setVisitedName] = useState(false);
  const [visitedAirDate, setVisitedAirDate] = useState(false);
  const [visitedEpisodeDesc, setVisitedEpisodeDesc] = useState(false);
  const [episodeDescValid, setEpisodeDescValid] = useState(true);

  const isFormValid =
    episodeData.name &&
    episodeData.air_date &&
    episodeData.episodeDesc &&
    episodeDescValid;

  const handleChange = (e, propName) =>
    setEpisodeData((prev) => ({ ...prev, [propName]: e.target.value }));

  function submitFunction(e) {
    e.preventDefault();
    submitHandler(episodeData);
  }

  function checkEpisodeDesc(episodeDesc) {
    return /^S[1-9][0-9]E[1-9][0-9]$/.test(episodeDesc);
  }

  return (
    <form onSubmit={submitFunction} noValidate>
      <div className="flex flex-col gap-y-2">
        <div className={visitedName ? "was-validated" : ""}>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Name"
            value={episodeData.name}
            onChange={(e) => handleChange(e, "name")}
            onBlur={() => {
              setVisitedName(true);
            }}
            required
          />
          <div className="invalid-feedback">
            {!episodeData.name
              ? "Please enter a name!"
              : episodeData.name.length < 3
              ? "Name must have at least three characters!"
              : ""}
          </div>
        </div>
        <div className={visitedAirDate ? "was-validated" : ""}>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Air Date"
            value={episodeData.air_date}
            onChange={(e) => handleChange(e, "air_date")}
            onBlur={() => setVisitedAirDate(true)}
            required
            type="date"
          />
          <div className="invalid-feedback">Please enter an Air Date!</div>
        </div>
        <div className={visitedEpisodeDesc ? "was-validated" : ""}>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Episode"
            value={episodeData.episodeDesc}
            onChange={(e) => handleChange(e, "episodeDesc")}
            onBlur={() => {
              setVisitedEpisodeDesc(true);
              setEpisodeDescValid(checkEpisodeDesc(episodeData.episodeDesc));
            }}
            required
            pattern="^S[1-9][0-9]E[1-9][0-9]$"
          />
          <div className="invalid-feedback">
            {!episodeData.episodeDesc
              ? "Please enter an Episode Short name!"
              : ""}
            {!episodeDescValid
              ? "Please enter an episode in proper format S01E01!"
              : ""}
          </div>
        </div>
        <div className="flex flex-row p-2">
          <Link href="/episodes">
            <Button variant="btn btn-outline-danger  w-1/2 mr-2">Back</Button>
          </Link>

          <Button
            variant="btn btn-outline-success w-1/2"
            type="submit"
            disabled={!isFormValid}
          >
            {!initialData ? "Add new episode!" : "Update episode"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default FormComponent;
