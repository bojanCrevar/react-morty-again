import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import { useFormik } from "formik";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import * as Yup from "yup";
import FormControl from "react-bootstrap/FormControl";
import { CharactersModel } from "../model/charactersModel";

type FormComponentProps = {
  submitHandler: (submittedEpisodeData: CharactersModel) => void;
  initialData: CharactersModel;
};

function FormComponent({ submitHandler, initialData }: FormComponentProps) {
  const charactersSchema = Yup.object({
    name: Yup.string().required("Name field is required."),
    status: Yup.string().required("Status is required."),
    gender: Yup.string().required("Gender is required."),
    species: Yup.string().required("Species field is required."),
    location: Yup.string()
      .min(3, "Must be 3 character or more")
      .required("Location field is required."),
    image: Yup.string()
      .matches(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
        "Please enter a valid URL"
      )
      .required("Image URL is required"),
  });

  const initialValues: CharactersModel = {
    id: initialData.id || 0,
    name: initialData.name || "",
    status: initialData.status || "",
    gender: initialData.gender || "",
    species: initialData.species || "",
    location: {
      name: initialData.location?.name || "",
    },
    image: initialData.image || "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: charactersSchema,
    onSubmit: submitFunction,
  });

  function submitFunction(submittedEpisodeData: CharactersModel) {
    submittedEpisodeData.id = initialData.id;
    submitHandler(submittedEpisodeData);
  }

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <div className="flex flex-col gap-y-2 ">
        <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
          <Form.Control
            name="name"
            type="text"
            className="input form-control"
            placeholder="Characters name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!(formik.touched.name && formik.errors.name)}
            autoComplete="off"
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
        </FloatingLabel>

        <div className="pb-2">
          {["Alive", "Dead", "unknown"].map((type) => (
            <Form.Check
              key={type}
              inline
              label={type}
              name="status"
              type="radio"
              id={`inline-radio-${type}`}
              value={type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!(formik.touched.status && formik.errors.status)}
              defaultChecked={type === formik.values.status ? true : false}
            />
          ))}
          <Form.Control.Feedback
            type="invalid"
            style={
              formik.touched.status
                ? formik.errors.status
                  ? { display: "block" }
                  : {}
                : {}
            }
          >
            {formik.errors.status}
          </Form.Control.Feedback>
        </div>

        <FloatingLabel
          controlId="floatingInput"
          label="Gender"
          className="mb-3"
        >
          <Form.Select
            name="gender"
            onChange={formik.handleChange}
            value={formik.values.gender}
            onBlur={formik.handleBlur}
            isInvalid={!!(formik.touched.gender && formik.errors.gender)}
          >
            {!initialData.status && (
              <option value={0}>Select character!</option>
            )}
            {["Male", "Female", "Genderless", "unknown"].map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formik.errors.gender}
          </Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Species"
          className="mb-3"
        >
          <Form.Control
            name="species"
            type="text"
            className="input form-control"
            placeholder="Characters name"
            value={formik.values.species}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!(formik.touched.species && formik.errors.species)}
            autoComplete="off"
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.species}
          </Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Locations"
          className="mb-3"
        >
          <Form.Control
            name="location"
            type="text"
            className="input form-control"
            placeholder="Characters name"
            value={formik.values.location?.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!(formik.touched.location && formik.errors.location)}
            autoComplete="off"
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.location}
          </Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Image URL"
          className="mb-3"
        >
          <Form.Control
            name="image"
            type="text"
            className="input form-control"
            placeholder="Characters name"
            value={formik.values.image}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!(formik.touched.image && formik.errors.image)}
            autoComplete="off"
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.image}
          </Form.Control.Feedback>
        </FloatingLabel>

        <div className="flex flex-row p-2">
          <Link href="/characters">
            <Button variant="btn btn-outline-danger  w-1/2 mr-2">Back</Button>
          </Link>

          <Button
            variant="btn btn-outline-success w-1/2"
            type="submit"
            disabled={!formik.isValid}
          >
            {!initialData ? "Add new character!" : "Update character"}
          </Button>
        </div>
      </div>
    </form>
  );
}
export default FormComponent;
