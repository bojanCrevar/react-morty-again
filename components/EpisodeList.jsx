import RMTable from "./RMTable";
import { Fragment } from "react";
import { useRouter } from "next/router";
import useCharacters from "../hooks/useCharacters";

const EpisodeList = ({ episodes }) => {
  const router = useRouter();
  const locationscolumns = [
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
      <RMTable
        tabledata={mappedEpisodes}
        columnconfig={locationscolumns}
        onUpdate={handleUpdate}
      />
    </Fragment>
  );
};

export default EpisodeList;
