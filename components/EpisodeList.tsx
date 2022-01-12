import RMTable from "./RMTable";
import { Fragment } from "react";
import { useRouter } from "next/router";
import useCharacters from "../hooks/useCharacters";
import { ActionContext } from "../context/ActionContext";
import TableSkeletons from "./skeletons/TableSkeletons";
import { ColumnCfg } from '../model/columnCfgModel';
import { EpisodeItem } from '../model/episodeModel';

type EpisodeListProps = {
  episodes: EpisodeItem[];
  fetchData?: () => void;
};

const EpisodeList = ({ episodes }: EpisodeListProps) => {
  const router = useRouter();
  const episodeColumns: ColumnCfg<EpisodeItem>[] = [
    { key: "air_date", title: "Title" },
    { key: "air_date", title: "Release date" },
    { key: "episode", title: "Episode" },
    {
      key: "charactersString",
      title: "Characters",
      tooltip: "charactersTooltip",
    },
  ];
  const mappedEpisodes = useCharacters(episodes);
  function handleUpdate(id: number) {
    router.push("episodes/edit/" + id);
  }

  return episodes.length ? (
    <Fragment>
      <ActionContext.Provider value={{ handleUpdate }}>
        <RMTable tableData={mappedEpisodes} columnConfig={episodeColumns} />
      </ActionContext.Provider>
    </Fragment>
  ) : (
    <TableSkeletons amount={10} pageColumns={episodeColumns} />
  );
};

export default EpisodeList;
