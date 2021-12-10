import RMTable from "./RMTable";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";

const EpisodeList = ({ episodes }) => {
  // const [mappedEpisodes, setMappedEpisodes] = useState(episodes);
  const [characters, setCharacters] = useState();

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

    // [1,2,3,2,4]
    function onlyUnique(charId, index, charIdArray) {
      return charIdArray.indexOf(charId) === index;
    }

    console.log("UNIQ", uniqueArray.filter(onlyUnique));
    return uniqueArray.filter(onlyUnique); //[]
  }

  async function getCharacter(characters) {
    const response = await axios.get("api/characters/", {
      params: { characters },
      paramsSerializer: (params) => {
        console.log("PARAMS: ", params.characters);

        return `characters=${extractUniqueCharacters(params.characters)}`;
      },
    });

    console.log("GET api/characters/", response);
    if (response.status === 200) return response;
    else return "No character in db!";
  }

  useEffect(() => {
    let listChar = "";
    async function mapEpisodes() {
      const charsByEpisodesList = episodes.map((episode) => {
        let episodeCharIds = [];
        episode.characters.map((character) => {
          const curId = character.slice(
            character.lastIndexOf("/") + 1,
            character.lastIndexOf("/") + 3
          );
          listChar = listChar + curId + ",";
          episodeCharIds.push(curId);
          return listChar;
        });

        return {
          id: episode.id,
          characters: listChar,
          episodeCharIds: episodeCharIds,
        };
      });

      const characterNames = await getCharacter(charsByEpisodesList);
      console.log("char na frontend", charsByEpisodesList);
      const test = charsByEpisodesList.map((charsEp) =>
        charsEp.episodeCharIds.map((id) =>
          characterNames.data.charactersById.find(
            (x) => (x.id ? x.id : 0).toString() === id.toString()
          )
        )
      );
      console.log("char iz apija", characterNames.data.charactersById);

      console.log("TEST", test);
      setCharacters(characterNames);
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
