import RMTable from "./RMTable";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";

const EpisodeList = ({ episodes }) => {
  const [mappedEpisodes, setMappedEpisodes] = useState(episodes);
  const router = useRouter();
  const locationscolumns = [
    { key: "name", title: "Title" },
    { key: "air_date", title: "Release date" },
    { key: "episode", title: "Episode" },
    // { key: "characters", title: "Characters" },
    {
      key: "charactersString",
      title: "Characters",
      tooltip: "charactersTooltip",
    },
  ];

  async function getCharacter(id) {
    const response = await axios.get("api/characters/" + id);
    //console.log(response);
    if (response.status === 200) return response.data.character.name;
    else return "No character in db!";
  }

  useEffect(() => {
    async function mapEpisodes() {
      const charPromisesList = episodes.map((episode) => {
        const charPromises = episode.characters.map((character) => {
          const id = character.slice(
            character.lastIndexOf("/") + 1,
            character.lastIndexOf("/") + 3
          );
          return getCharacter(id);
        });
        return {
          id: episode.id,
          promises: charPromises,
        };
      });

      episodes.map((e, i) => {
        console.log(
          "Mapping ep",
          e,
          i,
          charPromisesList.find((cp) => cp.id === e.id).promises
        );
        Promise.all(
          charPromisesList.find((cp) => cp.id === e.id).promises
        ).then((values) => {
          console.log("Char promise resolved", e, i, values);
          setMappedEpisodes((prevEpisodes) => {
            prevEpisodes[i] = {
              ...e,
              charactersString: values.join(),
              charactersTooltip: values.join(", "),
            };
            return prevEpisodes;
          });
        });
      });
    }
    mapEpisodes();
  }, [episodes]);

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
