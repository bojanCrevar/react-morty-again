import { Table } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styles from "../RMTable.module.css";

type TableSkeletonsProps = {
  amount: number;
  pageColumns: {
    key: string;
    title: string;
    tooltip?: string;
  }[];
};

const TableSkeletons = ({ amount, pageColumns }: TableSkeletonsProps) => {
  const renderSkeletons = (amount: number) => {
    let skeletons = [];
    for (let i = 0; i < amount; i++)
      skeletons.push(
        <tr
          key={i}
          className="flex flex-col md:flex-row even:bg-gray-500 md:even:bg-gray-400"
        >
          {pageColumns.map((column) => (
            <td
              key={column.key}
              data-title={column.title + ": "}
              className="w-full"
            >
              <Skeleton className={styles.tableskeletons} />
            </td>
          ))}
        </tr>
      );
    return skeletons;
  };

  const displaySkeletons = renderSkeletons(amount);

  return (
    <SkeletonTheme
      baseColor="#a6a6a6"
      highlightColor="#c2c2c2"
      borderRadius="1"
      duration={2}
    >
      <Table bordered hover striped responsive className={styles.rmtable}>
        <thead className="hidden md:block">
          <tr className="flex flex-col md:flex-row">
            {pageColumns.map((column) => (
              <th key={column.key} className="w-full">
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{displaySkeletons}</tbody>
      </Table>
    </SkeletonTheme>
  );
};

export default TableSkeletons;
