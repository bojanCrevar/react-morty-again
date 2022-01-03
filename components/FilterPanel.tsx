import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Fragment } from "react";
import Button from "react-bootstrap/Button";

type FilterPanelProps = {
  checkbox?: { title: string; values: string[] }[];
  radio?: { title: string; values: string[] }[];
  date?: boolean;
};

export default function FilterPanel({
  checkbox,
  radio,
  date,
}: FilterPanelProps) {
  function submitHandler(e: any) {
    e.preventDefault();
    console.log("Submit");
  }

  return (
    <div className="bg-white rounded-md p-2">
      <div className="font-bold text-center pt-2 text-lg">Filter panel</div>
      {checkbox &&
        checkbox.map((object) => (
          <div key={object.title}>
            <hr className="solid" />
            <div className="text-gray-700 font-semibold mb-2">
              {object.title}
            </div>
            <div className="text-gray-500">
              {object.values.map((item) => (
                <Form.Group className="mb-1" controlId={item} key={item}>
                  <Form.Check type="checkbox" label={item} />
                </Form.Group>
              ))}
            </div>
          </div>
        ))}

      {radio &&
        radio.map((object) => (
          <div key={object.title}>
            <hr className="solid" />
            <div className="text-gray-700 font-semibold mb-2">
              {object.title}
            </div>
            <div className="text-gray-500">
              {object.values.map((item) => (
                <Form.Group className="mb-1" controlId={item} key={item}>
                  <Form.Check
                    label={item}
                    name="group1"
                    type="radio"
                    id={item}
                  />
                </Form.Group>
              ))}
            </div>
          </div>
        ))}

      {date && (
        <div>
          <hr className="solid" />
          <div className="text-gray-700 font-semibold mb-2">Date</div>
          <div className="text-gray-500">
            {["FirstDate", "SecondDate"].map((item) => (
              <FloatingLabel
                controlId="floatingInput"
                label={item}
                className="mb-3"
                key={item}
              >
                <Form.Control
                  name={item}
                  type="date"
                  className="input form-control"
                  placeholder={item}
                />
              </FloatingLabel>
            ))}
          </div>
        </div>
      )}

      <hr className="solid" />

      <div className="mt-2">
        <Button className="w-full" variant="primary" type="submit">
          Search
        </Button>
      </div>
    </div>
  );
}
