import { useState, useEffect } from "react";
import axios from "axios";
import { RMItem, RMItemWithChars } from "../model/RMItem";

const useCharacters = <T extends RMItemWithChars>(origItemList: T[]) => {
  const [mappedDataFromComponent, setMappedDataFromComponent] =
    useState(origItemList);
  async function getCharacters(characterIds: string[]): Promise<RMItem[]> {
    const response = await axios.get("api/characters/", {
      params: { characterIds },
      paramsSerializer: (params) => {
        return `characters=${characterIds}`;
      },
    });

    if (response.status === 200) return response.data.characters;
    else return [];
  }

  function getUniqueCharIds(origItemList: T[]): string[] {
    const uniqueCharIds = new Set<string>();
    origItemList.forEach((i) => {
      i.charactersIds = (i.residents ?? i.characters ?? []).map(
        (charUrl: string) => charUrl.substring(charUrl.lastIndexOf("/") + 1)
      );
      i.charactersIds.forEach((id: string) => uniqueCharIds.add(id));
    });
    return Array.from(uniqueCharIds.values());
  }

  function fillItemsCharacterAttributes(
    characters: RMItem[],
    itemWithChars: RMItemWithChars
  ) {
    const itemCharNames = characters
      .filter((ch) => itemWithChars.charactersIds?.includes("" + ch.id))
      .map((ch) => ch.name);
    itemWithChars.charactersTooltip = itemCharNames.join(", ");
    itemWithChars.charactersString = itemCharNames.slice(0, 3).join(", ");
  }

  async function getCharacterNames() {
    //create parsed char id list for each item
    //at the same time create unique chars list across items
    const uniqueCharIds: string[] = getUniqueCharIds(origItemList);

    if (uniqueCharIds.length > 0) {
      //get characters from backend
      const characters: RMItem[] = await getCharacters(uniqueCharIds);

      //for each origItemList item map its character array and assign the missing charactersTooltip/String properties
      origItemList.forEach((oi: RMItemWithChars) => {
        fillItemsCharacterAttributes(characters, oi);
      });
    }

    setMappedDataFromComponent([...origItemList]);
  }

  useEffect(() => {
    if (origItemList?.length) {
      getCharacterNames();
    }
  }, [origItemList]);

  return mappedDataFromComponent;
};

export default useCharacters;
