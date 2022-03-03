import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import ActionButton from "./ActionButton";
import styles from "./RMTable.module.css";
import { ColumnModel } from "../model/columnCfgModel";
import { RMItemWithChars } from "../model/RMItem";
import { RootState } from "../model/storeModel";
import { useSelector } from "react-redux";

const RMTable = <T extends RMItemWithChars>({
  columnConfig,
  tableData,
}: ColumnModel<T>) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const [hovered, setHovered] = useState<number | null>(null);
  const lastColumn = columnConfig.length - 1;
  const dataRender = tableData.map((data) => {
    return (
      <tr
        key={data.id}
        onMouseEnter={() => setHovered(data.id)}
        onMouseLeave={() => setHovered(null)}
        className="flex flex-col md:flex-row bg-gray-200 border-gray-400 text-gray-600 md:first:border-t-8 border-b-4 dark:bg-[#6F737B] dark:text-gray-300  dark:border-[#414b55]"
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
                  {isLoggedIn && (
                    <ActionButton id={data.id} hovered={hovered === data.id} />
                  )}
                </span>
              ) : null}
            </td>
          );
        })}
      </tr>
    );
  });

  return (
    <Table hover borderless responsive className={styles.rmtable}>
      <thead className="hidden md:block border-b-2 border-gray-200 dark:border-gray-400">
        <tr className="flex flex-col md:flex-row text-gray-600 dark:text-gray-300 ">
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
