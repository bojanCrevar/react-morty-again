import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import { CharactersItem } from "../model/charactersModel";
import { RMItem } from "../model/RMItem";

const animatedComponents = makeAnimated();
const dummyOptions = [
  { value: "rick", label: "Rick" },
  { value: "morty", label: "Morty" },
  { value: "beth", label: "Beth" },
  { value: "aquamorty", label: "Aqua Morty" },
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
  value,
}: MultipleSelectProps) => {
  const [charOptions, setCharOptions] = useState();
  //console.log("initValues", value);
  const charIds = value!.map((charUrl: string) =>
    charUrl.substring(charUrl.lastIndexOf("/") + 1)
  );
  //console.log("charIds", charIds);

  async function getCharacters(characterIds: string[]): Promise<RMItem[]> {
    const response = await axios.get("/api/characters/", {
      params: { characterIds },
      paramsSerializer: (params) => {
        return `characters=${characterIds}`;
      },
    });

    if (response.status === 200) return response.data.characters;
    else return [];
  }
  async function getCharactersName() {
    if (charIds.length > 0) {
      const characters: any = await getCharacters(charIds);
      setCharOptions(
        characters.map((char: CharactersItem) => {
          return { value: char.id, label: char.name };
        })
      );
    } else setCharOptions(undefined);
  }

  useEffect(() => {
    getCharactersName();
  }, []);

  console.log("charOptions", charOptions);

  const onSelect = (e: any) => {
    setCharOptions(e);
    // let newArrayChar = charOptions.map((char: any) => {
    //   return (
    //     "https://rickandmortyapi.com/api/character/" + parseInt(char.value)
    //   );
    // });
    // console.log("newArray", newArrayChar);
    //onChange(newArrayChar);
  };
  return (
    <AsyncSelect
      onChange={onSelect}
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      value={charOptions}
      defaultOptions={dummyOptions}
    />
  );
};

export default MultipleSelect;
