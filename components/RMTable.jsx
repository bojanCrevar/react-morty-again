import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import ActionButton from "./ActionButton";

//const ACTIONS_COL_NAME = "updateCol";

const RMTable = ({
  columnconfig: columnConfig,
  tabledata: tableData,
  onUpdate,
  onDelete,
}) => {
  const [hovered, setHovered] = useState(null);

  const cfgLength = columnConfig.length;

  // if (onUpdate || onDelete) {
  //   columnConfig = [
  //     ...columnConfig,
  //     { title: "Actions", key: ACTIONS_COL_NAME },
  //   ];
  // }

  const locationsRender = tableData.map((data) => {
    return (
      <tr
        key={data.id}
        onMouseEnter={() => {
          setHovered(data.id);
        }}
        onMouseLeave={() => setHovered(null)}
      >
        {columnConfig.map((cfg, i) => {
          // if (cfg.key === ACTIONS_COL_NAME) {
          //   return (
          //     <td key={cfg.key}>
          //       <ActionButton
          //         onUpdate={onUpdate}
          //         onDelete={onDelete}
          //         id={data.id}
          //         hovered={hovered === data.id}
          //       />
          //     </td>
          //   );
          // } else {
          if (i === cfgLength - 1) {
            return (
              <td className="flex items-center relative">
                <td
                  key={cfg.key}
                  title={cfg.tooltip ? data[cfg.tooltip] : ""}
                  className="text-left"
                >
                  {data[cfg.key]}
                </td>
                <td className="position: absolute right-0">
                  <ActionButton
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    id={data.id}
                    hovered={hovered === data.id}
                  />
                </td>
              </td>
            );
          } else {
            return (
              <td key={cfg.key} title={cfg.tooltip ? data[cfg.tooltip] : ""}>
                {data[cfg.key]}
              </td>
            );
          }
        })}
      </tr>
    );
  });

  return (
    <Table bordered hover striped responsive className="container m-auto mb-3">
      <thead>
        <tr>
          {columnConfig.map((cfg, i) => {
            if (i === cfgLength - 1) {
              return (
                <th key={cfg.key} className="w-1/4">
                  {cfg.title}
                </th>
              );
            } else {
              return <th key={cfg.key}>{cfg.title}</th>;
            }
          })}
        </tr>
      </thead>
      <tbody>{locationsRender}</tbody>
    </Table>
  );
};

export default RMTable;
