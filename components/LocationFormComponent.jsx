import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import { useFormik } from "formik";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import * as Yup from "yup";

function LocationFormComponent({ submitHandler, initialData }) {
  function submitFunction(submittedLocationsData) {
    submittedLocationsData.id = initialData.id;
    submitHandler(submittedLocationsData);
  }

  const locationsSchema = Yup.object({
    name: Yup.string()
      .min(3, "Must be 3 characters or more")
      .required("Name field is required."),
    dimension: Yup.string()
      .min(3, "Must be 3 characters or more")
      .required("Dimension field is required."),
    type: Yup.string()
      .min(3, "Must be 3 characters or more")
      .required("Type field is required."),
  });

  const initialValues = {
    name: initialData.name || "",
    dimension: initialData.dimension || "",
    type: initialData.type || "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: locationsSchema,
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
            placeholder="Location's name"
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
          label="Dimension"
          className="mb-3"
        >
          <Form.Control
            name="dimension"
            type="text"
            className="input form-control"
            placeholder="Dimension"
            value={formik.values.dimension}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.dimension && formik.errors.dimension}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.dimension}
          </Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="Type" className="mb-3">
          <Form.Control
            name="type"
            type="text"
            className="input form-control"
            placeholder="Type"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.type && formik.errors.type}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.type}
          </Form.Control.Feedback>
        </FloatingLabel>

        <div className="flex flex-row p-2">
          <Link href="/locations">
            <Button variant="btn btn-outline-danger w-1/2 mr-2">Back</Button>
          </Link>
          <Button
            variant="btn btn-outline-success w-1/2"
            type="submit"
            disabled={!formik.isValid}
          >
            {!initialData ? "Add new location!" : "Update location"}
          </Button>
        </div>
      </div>
    </Form>
  );
}
export default LocationFormComponent;
