import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import { useFormik } from "formik";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import * as Yup from "yup";
import { CharactersItem } from "../../model/charactersModel";

type FormComponentProps = {
  submitHandler: (submittedEpisodeData: CharactersItem) => void;
  initialData: CharactersItem;
};

interface CharactersItemData extends CharactersItem {
  locationName: string;
}

function FormComponent({ submitHandler, initialData }: FormComponentProps) {
  const charactersSchema = Yup.object({
    name: Yup.string().required("Name field is required."),
    status: Yup.string().required("Status is required."),
    gender: Yup.string().required("Gender is required."),
    species: Yup.string().required("Species field is required."),
    locationName: Yup.string()
      .min(3, "Must be 3 character or more")
      .required("Location field is required."),
    image: Yup.string()
      .matches(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
        "Please enter a valid URL"
      )
      .required("Image URL is required"),
  });

  const initialValues: CharactersItemData = {
    id: initialData.id || 0,
    name: initialData.name || "",
    status: initialData.status || "",
    gender: initialData.gender || "",
    species: initialData.species || "",
    locationName: initialData.location?.name || "",
    image: initialData.image || "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: charactersSchema,
    onSubmit: submitFunction,
    validateOnMount: true,
  });

  function submitFunction(submittedEpisodeData: CharactersItemData) {
    submittedEpisodeData.id = initialData.id;
    submittedEpisodeData.location = { name: submittedEpisodeData.locationName };
    submitHandler(submittedEpisodeData);
  }

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <div className="flex flex-col gap-y-2 ">
        <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
          <Form.Control
            data-testid="name"
            name="name"
            type="text"
            className="input form-control"
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

        <div className="pb-2 flex flex-col sm:flex-row justify-around">
          {["Alive", "Dead", "unknown"].map((type) => (
            <div>
              <Form.Check
                data-testid={"status_" + type}
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
                defaultChecked={type === formik.values.status}
              />
            </div>
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
            data-testid="gender"
            name="gender"
            onChange={formik.handleChange}
            value={formik.values.gender}
            onBlur={formik.handleBlur}
            isInvalid={!!(formik.touched.gender && formik.errors.gender)}
          >
            {!initialData.status && (
              <option value={0}>Select character!</option>
            )}
            {["Male", "Female", "unknown"].map((g) => (
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
            data-testid="species"
            name="species"
            type="text"
            className="input form-control"
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
            data-testid="locationName"
            name="locationName"
            type="text"
            className="input form-control"
            value={formik.values.locationName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={
              !!(formik.touched.locationName && formik.errors.locationName)
            }
            autoComplete="off"
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.locationName}
          </Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Image URL"
          className="mb-3"
        >
          <Form.Control
            data-testid="image"
            name="image"
            type="text"
            className="input form-control"
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
            variant="btn btn-success w-1/2"
            type="submit"
            disabled={!formik.isValid}
            data-testid="submit"
          >
            {initialData.id < 0 ? "Add new character!" : "Update character"}
          </Button>
        </div>
      </div>
    </form>
  );
}
export default FormComponent;
