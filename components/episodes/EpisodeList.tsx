import RMTable from "../RMTable";
import { Fragment } from "react";
import { useRouter } from "next/router";
import useCharacters from "../../hooks/useCharacters";
import { ActionContext } from "../../context/ActionContext";
import TableSkeletons from "../skeletons/TableSkeletons";
import { ColumnCfg } from "../../model/columnCfgModel";
import { EpisodeItem } from "../../model/episodeModel";
import Loader from "../Spinner";

type EpisodeListProps = {
  episodes: EpisodeItem[];
  skeleton: Boolean;
  loader: Boolean;
};

const EpisodeList = ({ episodes, skeleton, loader }: EpisodeListProps) => {
  const router = useRouter();
  const episodeColumns: ColumnCfg<EpisodeItem>[] = [
    { key: "name", title: "Title" },
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

  return (
    <>
      {skeleton && <TableSkeletons amount={20} pageColumns={episodeColumns} />}
      {loader ? (
        <Loader />
      ) : episodes.length > 0 ? (
        <ActionContext.Provider value={{ handleUpdate }}>
          <RMTable tableData={mappedEpisodes} columnConfig={episodeColumns} />
        </ActionContext.Provider>
      ) : (
        <div className="mt-4 bg-white rounded p-3 text-lg text-center">
          No items found!
        </div>
      )}
    </>
  );
};

export default EpisodeList;
