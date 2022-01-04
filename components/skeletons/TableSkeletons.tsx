import { Table } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

type TableSkeletonsProps = {
  amount: number;
  pageColumns: {
    key: string;
    title: string;
    tooltip?: string;
  }[];
};

const TableSkeletons = ({ amount, pageColumns }: TableSkeletonsProps) => {
  const episodescolumn = [
    { key: "name", title: "Title" },
    { key: "air_date", title: "Release date" },
    { key: "episode", title: "Episode" },
    {
      key: "charactersString",
      title: "Characters",
      tooltip: "charactersTooltip",
    },
  ];
  pageColumns = pageColumns ? pageColumns : episodescolumn;
  const renderSkeletons = (amount: number) => {
    let skeletons = [];
    for (let i = 0; i < amount; i++)
      skeletons.push(
        <tr style={{ width: "95%" }} key={i}>
          {pageColumns.map((column) => (
            <td key={column.key}>
              <Skeleton width="w-1/4" />
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
      <Table
        bordered
        hover
        striped
        responsive
        className="container m-auto mb-3"
      >
        <thead>
          <tr>
            {pageColumns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>{displaySkeletons}</tbody>
      </Table>
    </SkeletonTheme>
  );
};

export default TableSkeletons;
