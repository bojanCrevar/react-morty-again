import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import { CharactersItem } from "../model/charactersModel";
import { RMItem } from "../model/RMItem";

const animatedComponents = makeAnimated();

type MultipleSelectProps = {
  name: string;
  onChange: {
    (e: ChangeEvent<any>): void;
    <T_1 = any>(field: T_1): T_1 extends ChangeEvent<any>
      ? void
      : (e: any) => void;
  };
  value: [] | undefined;
};

const MultipleSelect = ({
  name,
  onChange,
  value: initValues,
}: MultipleSelectProps) => {
  const [charOptions, setCharOptions] = useState([]);
  const [defaultOptions, setDefaultOptions] = useState([]);

  const charIds = initValues!.map((charUrl: string) =>
    charUrl.substring(charUrl.lastIndexOf("/") + 1)
  );

  async function getCharacters(characterIds: string[]) {
    const response = await axios.get("/api/characters/", {
      params: { characterIds },
      paramsSerializer: (params) => {
        return `characters=${characterIds}`;
      },
    });

    if (response.status === 200) return response.data.characters;
    else return [];
  }
  async function loadChars(inputValue?: string) {
    const response = await axios.get("/api/characters", {
      params: { sort: "asc", keyword: inputValue },
    });

    if (response.status === 200) {
      return response.data.results.slice(0, 10).map((char: CharactersItem) => {
        return { value: char.id, label: char.name };
      });
    } else return [];
  }

  async function getCharactersName() {
    if (charIds.length > 0) {
      const characters: any = await getCharacters(charIds);

      setCharOptions(
        characters.map((char: CharactersItem) => {
          return { value: char.id, label: char.name };
        })
      );
    }
  }

  const promiseOptions = (inputValue: string) =>
    new Promise((resolve) => {
      loadChars(inputValue).then((data) => resolve(data));
      //resolve(loadChars(inputValue));
      // setTimeout(() => {

      // }, 1000);
    });

  useEffect(() => {
    getCharactersName();
    loadChars().then((loadedChars) => setDefaultOptions(loadedChars));
  }, []);

  useEffect(() => {
    if (charOptions) {
      let newArrayChar = charOptions.map((char: any) => {
        return (
          "https://rickandmortyapi.com/api/character/" + parseInt(char.value)
        );
      });

      onChange(newArrayChar);
    }
  }, [charOptions]);

  const onSelect = (e: any) => {
    setCharOptions(e);
  };

  return (
    <AsyncSelect
      onChange={onSelect}
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      value={charOptions}
      defaultOptions={defaultOptions}
      loadOptions={promiseOptions}
    />
  );
};

export default MultipleSelect;
