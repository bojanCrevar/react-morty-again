import RMTable from "./RMTable";
import { Fragment } from "react";
import { useRouter } from "next/router";
import useCharacters from "../hooks/useCharacters";
import { ActionContext } from "../context/ActionContext.tsx";
import TableSkeletons from "./skeletons/TableSkeletons";

const EpisodeList = ({ episodes }) => {
  const router = useRouter();
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
  const mappedEpisodes = useCharacters(episodes, "characters");
  function handleUpdate(id) {
    router.push("episodes/edit/" + id);
  }

  return (
    <Fragment>
      <ActionContext.Provider value={{ handleUpdate }}>
        <RMTable tabledata={mappedEpisodes} columnconfig={episodescolumn} />
      </ActionContext.Provider>
    </Fragment>
  );
};

export default EpisodeList;
