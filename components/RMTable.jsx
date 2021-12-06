import React from "react";
import Table from "react-bootstrap/Table";

const ACTIONS_COL_NAME = "updateCol";

const RMTable = ({
  columnconfig: columnConfig,
  tabledata: tableData,
  onUpdate,
}) => {
  if (onUpdate) {
    columnConfig = [
      ...columnConfig,
      { title: "Actions", key: ACTIONS_COL_NAME },
    ];
  }
  const locationsRender = tableData.map((data) => {
    return (
      <tr key={data.id}>
        {columnConfig.map((cfg) => {
          if (cfg.key === ACTIONS_COL_NAME) {
            return (
              <td>
                <button onClick={() => onUpdate(data.id)}>Edit</button>
              </td>
            );
          } else {
            return <td>{data[cfg.key]}</td>;
          }
        })}
      </tr>
    );
  });

  return (
    <Table bordered hover striped responsive className="container m-auto mb-3">
      <thead>
        <tr>
          {columnConfig.map((cfg) => (
            <th>{cfg.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>{locationsRender}</tbody>
    </Table>
  );
};

export default RMTable;
