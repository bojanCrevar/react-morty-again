import RMTable from "../RMTable";
import { Fragment } from "react";
import { useRouter } from "next/router";
import useCharacters from "../../hooks/useCharacters";
import { ActionContext } from "../../context/ActionContext";
import TableSkeletons from "../skeletons/TableSkeletons";
import { ColumnCfg } from "../../model/columnCfgModel";
import { EpisodeItem } from "../../model/episodeModel";
import Loader from "../Spinner";
import NoResults from "../NoResults";

type EpisodeListProps = {
  episodes: EpisodeItem[];
  episodeColumns: ColumnCfg<EpisodeItem>[];
};

const EpisodeList = ({ episodes, episodeColumns }: EpisodeListProps) => {
  const router = useRouter();

  const mappedEpisodes = useCharacters(episodes);
  function handleUpdate(id: number) {
    router.push("episodes/edit/" + id);
  }

  return episodes.length > 0 ? (
    <ActionContext.Provider value={{ handleUpdate }}>
      <RMTable tableData={mappedEpisodes} columnConfig={episodeColumns} />
    </ActionContext.Provider>
  ) : (
    <NoResults />
  );
};

export default EpisodeList;
