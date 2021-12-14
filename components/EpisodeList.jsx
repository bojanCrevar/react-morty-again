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

    function onlyUnique(charId, index, charIdArray) {
      return charIdArray.indexOf(charId) === index;
    }

    return uniqueArray.filter(onlyUnique);
  }

  async function getCharacter(characters) {
    const response = await axios.get("api/characters/", {
      params: { characters },
      paramsSerializer: (params) => {
        return `characters=${extractUniqueCharacters(params.characters)}`;
      },
    });

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

      const characters = (await getCharacter(charsByEpisodesList)).data
        .characters;

      charsByEpisodesList.forEach((chByEp, i) => {
        const charNamesByEp = chByEp.episodeCharIds
          .map(
            (epCharId) =>
              characters.find((c) => c.id.toString() === epCharId.toString())
                .name
          )
          .join(", ");
        const charactersString = (mappedEpisodes[i].charactersString =
          charNamesByEp.split(",").slice(0, 3).join(", "));

        mappedEpisodes[i] = {
          ...episodes[i],
          charactersTooltip: charNamesByEp,
          charactersString: charactersString,
        };
      });

      setMappedEpisodes([...mappedEpisodes]);
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
