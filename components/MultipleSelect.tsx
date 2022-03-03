import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import { CharactersItem } from "../model/charactersModel";
import { debounce } from "lodash";

const animatedComponents = makeAnimated();

type MultipleSelectProps = {
  name: string;
  onChange: {
    (e: ChangeEvent<any>): void;
    <T_1 = any>(field: T_1): T_1 extends ChangeEvent<any>
      ? void
      : (e: any) => void;
  };
  value: string[] | undefined;
};
type CharOptions = {
  value: number;
  label: string;
};
const MultipleSelect = ({
  name,
  onChange,
  value: initValues,
}: MultipleSelectProps) => {
  const [charOptions, setCharOptions] = useState<CharOptions[]>([]);
  const [defaultOptions, setDefaultOptions] = useState<CharOptions[]>([]);

  const charIds = (initValues ?? []).map((charUrl: string) =>
    charUrl.substring(charUrl.lastIndexOf("/") + 1)
  );

  async function getCharacters(
    characterIds: string[]
  ): Promise<CharactersItem[]> {
    const response = await axios.get("/api/characters/", {
      params: { characterIds },
      paramsSerializer: () => {
        return `characters=${characterIds}`;
      },
    });

    if (response.status === 200) return response.data.characters;
    else return [];
  }

  async function loadChars(inputValue?: string): Promise<CharOptions[]> {
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
      const characters: CharactersItem[] = await getCharacters(charIds);

      setCharOptions(
        characters.map((char: CharactersItem) => {
          return { value: char.id, label: char.name };
        })
      );
    }
  }

  const promiseOptions = (inputValue: string) =>
    loadChars(inputValue).then((data) => data);

  const debouncedPromiseOptions = debounce((input, resolve) => {
    promiseOptions(input).then(resolve);
  }, 500);

  useEffect(() => {
    getCharactersName();
    loadChars().then((loadedChars) => setDefaultOptions(loadedChars));
  }, []);

  useEffect(() => {
    if (charOptions) {
      let newArrayChar = charOptions.map((char: CharOptions) => {
        return "https://rickandmortyapi.com/api/character/" + char.value;
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
      closeMenuOnSelect={true}
      components={animatedComponents}
      isMulti
      value={charOptions}
      defaultOptions={defaultOptions}
      loadOptions={debouncedPromiseOptions}
      className="multipleselect mb-3"
      instanceId="multipleselect"
    />
  );
};

export default MultipleSelect;
