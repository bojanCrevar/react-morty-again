import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import { CharactersItem } from "../model/charactersModel";
import { RMItem } from "../model/RMItem";

const animatedComponents = makeAnimated();
const dummyOptions = [
  { value: "1", label: "Rick" },
  { value: "2", label: "Morty" },
  { value: "-67", label: "Beth" },
  { value: "-43", label: "Aqua Morty" },
];

type MultipleSelectProps = {
  name: string;
  onChange: {
    (e: ChangeEvent<any>): void;
    <T_1 = any>(field: T_1): T_1 extends ChangeEvent<any>
      ? void
      : (e: any) => void;
  };
  onBlur: {
    (e: React.FocusEvent<any>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  value: [] | undefined;
};

const MultipleSelect = ({
  name,
  onChange,
  onBlur,
  value: initValues,
}: MultipleSelectProps) => {
  const [charOptions, setCharOptions] = useState([]);
  const [debounceTerm, setDebounceTerm] = useState("");
  const [dropdownKeyword, setDropdownKeyword] = useState("");
  const [newChars, setNewChars] = useState([]);

  const charIds = initValues!.map((charUrl: string) =>
    charUrl.substring(charUrl.lastIndexOf("/") + 1)
  );

  async function getCharacters(characterIds?: string[]) {
    if (characterIds) {
      const response = await axios.get("/api/characters/", {
        params: { characterIds },
        paramsSerializer: (params) => {
          return `characters=${characterIds}`;
        },
      });

      if (response.status === 200) return response.data.characters;
      else return [];
    } else {
      const response = await axios.get("/api/characters", {
        params: { keyword: debounceTerm },
      });

      setNewChars(
        response.data.results.map((char: CharactersItem) => {
          return { value: char.id, label: char.name };
        })
      );
      console.log(response);
    }
  }

  const promiseOptions = (e: any) =>
    new Promise((resolve) => {
      setTimeout(() => {
        setDropdownKeyword(e);
        resolve(newChars);
      }, 1000);
    });

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

  useEffect(() => {
    getCharactersName();
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounceTerm(dropdownKeyword);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [dropdownKeyword]);

  useEffect(() => {
    getCharacters();
  }, [debounceTerm]);

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

  console.log("newChars", newChars);

  return (
    <AsyncSelect
      onChange={onSelect}
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      value={charOptions}
      defaultOptions={dummyOptions}
      loadOptions={(e: any) => {
        return promiseOptions(e);
      }}
    />
  );
};

export default MultipleSelect;
