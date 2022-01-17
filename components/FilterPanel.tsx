import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import { useRef, createRef, RefObject } from "react";
import { FilterModel } from "../model/filterModel";
import { FilterGroupConfig } from "../model/filterModel";

type FilterPanelProps = {
  filterConfig: FilterGroupConfig[];
  date?: boolean;
  submitFilterHandler: (e: any) => void;
};

type GroupValueRefsMap = {
  [key: string]: RefObject<HTMLInputElement>[];
};

export default function FilterPanel({
  filterConfig,
  date,
  submitFilterHandler,
}: FilterPanelProps) {
  const groupRefs = useRef<GroupValueRefsMap>(
    filterConfig.reduce((prev: GroupValueRefsMap, item) => {
      prev[item.key] = item.values.map(() => createRef<HTMLInputElement>());
      return prev;
    }, {})
  );

  function onSubmitClick(e: any) {
    e.preventDefault();
    const returnObject: FilterModel = {};
    filterConfig.forEach((group) => {
      console.log("group", group);
      const groupValues = groupRefs.current[group.key]
        .filter((refValue) => refValue.current!.checked)
        .map((refValue) => refValue.current!.id);

      if (groupValues.length) {
        returnObject[group.key] = groupValues;
      }
    });

    submitFilterHandler(returnObject);
  }

  return (
    <div className="bg-white rounded-md p-2">
      <form onSubmit={(e) => onSubmitClick(e)}>
        <div className="font-bold text-center pt-2 text-lg">Filter panel</div>
        <div className="overflow-y-auto max-h-[510px] ">
          {filterConfig.map((object) => (
            <div key={object.title}>
              <hr className="solid" />
              <div className="text-gray-700 font-semibold mb-2">
                {object.title}
              </div>
              <div className="text-gray-500">
                {object.values.map((value, index) => (
                  <Form.Check
                    label={value}
                    name={"group" + index}
                    type={object.type}
                    id={value}
                    key={value}
                    ref={groupRefs.current[object.key][index]}
                  />
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
