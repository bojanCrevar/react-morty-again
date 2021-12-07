import RMTable from "./RMTable";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";

const EpisodeList = ({ episodes }) => {
  // const [mappedEpisodes, setMappedEpisodes] = useState(episodes);
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

  function extractUniqueCharacters(episodesCharactersList) {
    const uniqueArray = episodesCharactersList
      .map((episodeCharData) => episodeCharData.characters)
      .reduce((prev, cur) => prev.concat(cur.split(",")), []);

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    console.log("UNIQ", uniqueArray.filter(onlyUnique));
    return uniqueArray.filter(onlyUnique);
  }

  async function getCharacter(characters) {
    const response = await axios.get("api/characters/", {
      params: { characters },
      paramsSerializer: (params) => {
        console.log("PARAMS: ", params.characters);

        return `characters=${extractUniqueCharacters(params.characters)}`;
      },
    });

    if (response.status === 200) return response;
    else return "No character in db!";
  }

  useEffect(() => {
    let listChar = "";
    async function mapEpisodes() {
      const charPromisesList = episodes.map((episode) => {
        episode.characters.map((character) => {
          listChar =
            listChar +
            character.slice(
              character.lastIndexOf("/") + 1,
              character.lastIndexOf("/") + 3
            ) +
            ",";

          return listChar;
        });

        return {
          id: episode.id,
          characters: listChar,
        };
      });

      getCharacter(charPromisesList);
    }
    mapEpisodes();
  }, [episodes]);

  function handleUpdate(id) {
    router.push("episodes/edit/" + id);
  }

  return (
    <Fragment>
      <RMTable
        tabledata={episodes}
        columnconfig={locationscolumns}
        onUpdate={handleUpdate}
      />
    </Fragment>
  );
};

export default EpisodeList;
