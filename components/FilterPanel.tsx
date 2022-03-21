import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import React, { useRef, createRef, RefObject } from "react";
import { FilterModel, FilterPanelProps } from "../model/filterModel";
import { useDispatch } from "react-redux";
import { filterActions } from "../store/filter-slice";
import { paginationActions } from "../store/pagination-slice";

type GroupValueRefsMap = {
  [key: string]: RefObject<HTMLInputElement>[];
};

export default function FilterPanel({
  initFilterValue,
  filterConfig,
  date,
  triggerSearch,
  closeModal,
}: FilterPanelProps) {
  const dispatch = useDispatch();

  const groupRefs = useRef<GroupValueRefsMap>(
    filterConfig.reduce((prev: GroupValueRefsMap, item) => {
      prev[item.key] = item.values.map(() => createRef<HTMLInputElement>());
      return prev;
    }, {})
  );

  function onSubmitClick(e: any) {
    e.preventDefault();
    triggerSearch();
    dispatch(paginationActions.setActivePage(1));
  }

  function onChangeState() {
    const returnObject: FilterModel = {};
    filterConfig.forEach((group) => {
      const groupValues = groupRefs.current[group.key]
        .filter((refValue) => refValue.current!.checked)
        .map((refValue) => refValue.current!.getAttribute("data-value")!);
      if (groupValues.length) {
        returnObject[group.key] = groupValues;
      }
    });

    dispatch(filterActions.setFilter(returnObject));
  }

  return (
    <div className="bg-[#fff] dark:bg-[#6F737B] rounded-md p-2 ">
      <form onSubmit={(e) => onSubmitClick(e)} onChange={onChangeState}>
        <div className="font-bold text-center pt-2 text-lg">Filter panel</div>
        <div className="overflow-y-auto max-h-[510px] ">
          {filterConfig.map((object) => (
            <div key={object.title}>
              <hr className="solid" />
              <div className="text-gray-900 font-semibold mb-2">
                {object.title}
              </div>
              <div className="text-gray-500 dark:text-white">
                {object.values.map((value, index) => (
                  <Form.Check
                    label={value}
                    name={object.key + index}
                    type={object.type}
                    id={object.key + index}
                    key={object.key + index}
                    data-value={value}
                    ref={groupRefs.current[object.key][index]}
                    defaultChecked={initFilterValue[object.key]?.includes(
                      value
                    )}
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
          <Button
            className="w-full"
            variant="primary"
            type="submit"
            onClick={closeModal}
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
}
