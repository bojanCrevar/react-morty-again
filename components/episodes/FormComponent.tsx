import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import { useFormik } from "formik";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import * as Yup from "yup";
import moment from "moment";
import { EpisodeItem, UNDEFINED_ID } from "../../model/episodeModel";
import EpisodeFormComponentInput from "../../model/episodeFormComponentInput";
import { ChangeEvent } from "react";
import MultipleSelect from "../MultipleSelect";
import axios, { AxiosResponse } from "axios";

function FormComponent({
  submitHandler,
  initialData,
}: EpisodeFormComponentInput) {
  function submitFunction(submittedEpisodeData: EpisodeItem) {
    submitHandler(submittedEpisodeData);
  }

  const episodeSchema = Yup.object({
    name: Yup.string()
      .min(4, "Must be 4 characters or more")
      .required("Required amigo"),
    air_date: Yup.date()
      .required("Required")
      .max(new Date(), "Ait Date can not be in future"),
    episode: Yup.string()
      .required("Required")
      .matches(
        /^S[0-9][1-9]E[0-9][1-9]$/,
        "Please enter an episode in proper format S01E01"
      )
      .test(
        "checkUniqueEpisode",
        "This episode is already existing",
        async (value) => {
          //do not call the check on create page initial load
          if (!value) {
            return false;
          }

          if (value === initialData.episode) {
            return true;
          }

          const response: AxiosResponse<{ exists: boolean }> = await axios.get(
            "/api/episodes/check",
            {
              params: { episode: value },
            }
          );

          return !response.data.exists;
        }
      ),
  });

  const initialValuesFormatted: EpisodeItem = {
    ...initialData,
    air_date: moment(new Date(initialData.air_date)).format("YYYY-MM-DD"),
    episode: initialData.episode,
  };

  const formik = useFormik({
    initialValues: initialValuesFormatted,
    validationSchema: episodeSchema,
    onSubmit: submitFunction,
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-y-2">
        <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
          <Form.Control
            name="name"
            type="text"
            className="input form-control"
            placeholder="Episode Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!(formik.touched.name && formik.errors.name)}
            data-testid="name"
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Air date"
          className="mb-3"
        >
          <Form.Control
            name="air_date"
            type="date"
            className="input form-control"
            placeholder="Air date"
            value={formik.values.air_date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!(formik.touched.air_date && formik.errors.air_date)}
            data-testid="air_date"
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.air_date}
          </Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Episode Description"
          className="mb-3"
        >
          <Form.Control
            name="episode"
            type="text"
            className="input form-control"
            placeholder="Episode Description"
            value={formik.values.episode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!(formik.touched.episode && formik.errors.episode)}
            data-testid="episode"
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.episode}
          </Form.Control.Feedback>
        </FloatingLabel>
        <MultipleSelect
          name="characters"
          onChange={(e: ChangeEvent<string[]>) => {
            formik.setFieldValue("characters", e);
          }}
          value={formik.values.characters}
        />

        <div className="flex flex-row p-2">
          <Link href="/episodes">
            <Button variant="btn btn-outline-danger  w-1/2 mr-2">Back</Button>
          </Link>
          <Button
            variant="success w-1/2"
            type="submit"
            disabled={!formik.isValid}
            data-testid="button"
          >
            {initialData.id === UNDEFINED_ID
              ? "Create episode"
              : "Update episode"}
          </Button>
        </div>
      </div>
    </Form>
  );
}
export default FormComponent;
