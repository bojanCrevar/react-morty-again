import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { RMItem } from "../model/RMItem";

const animatedComponents = makeAnimated();
// const charOptions = [
//   { value: "rick", label: "Rick" },
//   { value: "morty", label: "Morty" },
//   { value: "beth", label: "Beth" },
//   { value: "aquamorty", label: "Aqua Morty" },
// ];

type MultipleSelectProps = {
  name: string;
  onChange: (e: string | React.ChangeEvent<any>) => void;
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

  const charIds = value!.map((charUrl: string) =>
    charUrl.substring(charUrl.lastIndexOf("/") + 1)
  );
  console.log("charIds", charIds);

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
    const characters: any = await getCharacters(charIds);

    let chars = characters.map((char) => {
      return { value: char.id, label: char.name };
    });
    setCharOptions(chars);
    console.log("charOptions", charOptions);
  }

  useEffect(() => {
    getCharactersName();
  }, []);

  const [select, setSelect] = useState();
  const onSelect = (e: any) => {
    console.log(e);
    //onChange(e);
    //setSelect(e);
  };
  return (
    <Select
      value={select}
      onChange={onSelect}
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      defaultValue={value}
    />
  );
};

export default MultipleSelect;
