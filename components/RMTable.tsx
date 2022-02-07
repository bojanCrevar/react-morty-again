import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import ActionButton from "./ActionButton";
import styles from "./RMTable.module.css";
import { ColumnModel } from "../model/columnCfgModel";
import { RMItemWithChars } from "../model/RMItem";

const RMTable = <T extends RMItemWithChars>({
  columnConfig,
  tableData,
}: ColumnModel<T>) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const lastColumn = columnConfig.length - 1;
  const dataRender = tableData.map((data) => {
    return (
      <tr
        key={data.id}
        onMouseEnter={() => setHovered(data.id)}
        onMouseLeave={() => setHovered(null)}
        className="flex flex-col md:flex-row bg-gray-200 border-gray-400 text-gray-600 first:border-t-8 border-b-4"
      >
        {columnConfig.map((cfg, i) => {
          return (
            <td
              key={cfg.key as string}
              className={"w-full " + (i === lastColumn ? "relative" : "")}
              data-title={cfg.title + ": "}
            >
              <span title={cfg.tooltip ? "" + data[cfg.tooltip] : ""}>
                {data[cfg.key]}
              </span>
              {i === lastColumn ? (
                <span className="position: absolute right-1 ">
                  <ActionButton id={data.id} hovered={hovered === data.id} />
                </span>
              ) : null}
            </td>
          );
        })}
      </tr>
    );
  });

  return (
    <Table hover responsive className={styles.rmtable}>
      <thead className="hidden md:block">
        <tr className="flex flex-col md:flex-row text-gray-700 border-gray-400">
          {columnConfig.map((cfg, i) => {
            return (
              <th key={cfg.key as string} className="w-full">
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
