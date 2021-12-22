import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import ActionButton from "./ActionButton";

const RMTable = ({
  columnconfig: columnConfig,
  tabledata: tableData,
}) => {
  const [hovered, setHovered] = useState(null);
  const lastColumn = columnConfig.length - 1;

  const dataRender = tableData.map((data) => {
    return (
      <tr
        key={data.id}
        onMouseEnter={() => setHovered(data.id)}
        onMouseLeave={() => setHovered(null)}
      >
        {columnConfig.map((cfg, i) => {
          return (
            <td key={cfg.key} className={i === lastColumn ? "relative" : ""}>
              <span title={cfg.tooltip ? data[cfg.tooltip] : ""}>
                {data[cfg.key]}
              </span>
              {i === lastColumn ? (
                <span className="position: absolute right-1">
                  <ActionButton
                    id={data.id}
                    hovered={hovered === data.id}
                  />
                </span>
              ) : null}
            </td>
          );
        })}
      </tr>
    );
  });

  return (
    <Table bordered hover striped responsive className="container m-auto mb-3">
      <thead>
        <tr>
          {columnConfig.map((cfg, i) => {
            return (
              <th key={cfg.key} className={i === lastColumn ? "w-1/4" : ""}>
                {cfg.title}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>{dataRender}</tbody>
    </Table>
  );
};

export default RMTable;
