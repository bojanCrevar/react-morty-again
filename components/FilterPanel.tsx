import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import { useRef } from "react";

type FilterPanelProps = {
  filterConfig?: {
    title: string;
    values: string[];
    type: "checkbox" | "radio";
  }[];
  date?: boolean;
  submitHandler: (e: any) => void;
};

export default function FilterPanel({
  filterConfig,
  date,
  submitHandler,
}: FilterPanelProps) {
  return (
    <div className="bg-white rounded-md p-2">
      <form onSubmit={submitHandler}>
        <div className="font-bold text-center pt-2 text-lg">Filter panel</div>
        <div className="overflow-y-auto max-h-[510px] ">
          {filterConfig &&
            filterConfig.map((object, i) => (
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
                        name={"group" + i}
                        type={object.type}
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
        </div>

        <hr className="solid" />

        <div className="mt-2">
          <Button className="w-full" variant="primary" type="submit">
            Search
          </Button>
        </div>
      </form>
    </div>
  );
}
