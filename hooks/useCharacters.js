import { useState, useEffect } from "react";
import axios from "axios";

const useCharacters = (dataFromComponent, charactersPropName) => {
  const [mappedDataFromComponent, setMappedDataFromComponent] =
    useState(dataFromComponent);

  function extractUniqueCharacters(dataCharacters) {
    const uniqueArray = dataCharacters
      .map((charData) => charData.characters)
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
    async function mapDataFromComponent() {
      const charsByDataComponent = dataFromComponent.map((data) => {
        let componentCharIds = [];
        data[charactersPropName].map((character) => {
          const curId = character.slice(
            character.lastIndexOf("/") + 1,
            character.lastIndexOf("/") + 3
          );
          listChar = listChar + curId + ",";
          componentCharIds.push(curId);
          return listChar;
        });

        return {
          id: data.id,
          characters: listChar,
          componentCharIds: componentCharIds,
        };
      });

      const characters = (await getCharacter(charsByDataComponent)).data
        .characters;
      const newMappedData = [];
      charsByDataComponent.forEach((chByComp, i) => {
        const charNamesByComp = chByComp.componentCharIds
          .map(
            (compCharId) =>
              characters.find((c) => c.id.toString() === compCharId.toString())
                .name
          )
          .join(", ");
        const charactersString = charNamesByComp
          .split(",")
          .slice(0, 3)
          .join(", ");
        newMappedData.push({
          ...dataFromComponent[i],
          charactersTooltip: charNamesByComp,
          charactersString: charactersString,
        });
      });
      setMappedDataFromComponent(newMappedData);
    }
    mapDataFromComponent();
  }, [dataFromComponent]);

  return mappedDataFromComponent;
};

export default useCharacters;
