import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import { useFormik } from "formik";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import * as Yup from "yup";
import moment from "moment";

function FormComponent({ submitHandler, initialData }) {
  function submitFunction(submittedEpisodeData) {
    submittedEpisodeData.id = initialData.id;
    submittedEpisodeData.air_date = submittedEpisodeData.airDate;

    delete submittedEpisodeData.airDate;

    submitHandler(submittedEpisodeData);
  }

  const episodeSchema = Yup.object({
    name: Yup.string()
      .min(4, "Must be 4 characters or more")
      .required("Required amigo"),
    airDate: Yup.date("Date error")
      .required("Required")
      .max(new Date(), "Ait Date can not be in future"),
    episodeDesc: Yup.string()
      .matches(
        /^S[0-9][1-9]E[0-9][1-9]$/,
        "Please enter an episode in proper format S01E01"
      )
      .required("Required"),
  });

  const initialValues = {
    name: initialData.name,
    airDate: moment(new Date(initialData.air_date)).format("YYYY-MM-DD"),
    episodeDesc: initialData.episode,
  };

  const formik = useFormik({
    initialValues: initialValues,
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
            isInvalid={formik.touched.name && formik.errors.name}
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
            name="airDate"
            type="date"
            className="input form-control"
            placeholder="Air date"
            value={formik.values.airDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.airDate && formik.errors.airDate}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.airDate}
          </Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Episode Description"
          className="mb-3"
        >
          <Form.Control
            name="episodeDesc"
            type="text"
            className="input form-control"
            placeholder="Episode Description"
            value={formik.values.episodeDesc}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.episodeDesc && formik.errors.episodeDesc}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.episodeDesc}
          </Form.Control.Feedback>
        </FloatingLabel>

        <div className="flex flex-row p-2">
          <Link href="/episodes">
            <Button variant="btn btn-outline-danger  w-1/2 mr-2">Back</Button>
          </Link>
          <Button
            variant="btn btn-outline-success w-1/2"
            type="submit"
            disabled={!formik.isValid}
          >
            {!initialData ? "Add new episode!" : "Update episode"}
          </Button>
        </div>
      </div>
    </Form>
  );
}
export default FormComponent;
