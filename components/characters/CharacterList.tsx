import React, { Dispatch, SetStateAction } from "react";
import CharCard from "./CharCard";
import axios from "axios";
import { CharactersItem } from "../../model/charactersModel";
import { ResponseData } from "../../model/ResponseDataModel";
import NoResults from "../NoResults";
import { PAGE_SIZE } from "../../utils/apiResponse";

type CharListProps = {
  characters: CharactersItem[];
  setData: Dispatch<SetStateAction<ResponseData<CharactersItem>>>;
  setLoader: Dispatch<SetStateAction<Boolean>>;
};

function CharacterList({ characters, setData, setLoader }: CharListProps) {
  async function handleDelete(id: number) {
    const response = await axios.delete(
      `/api/characters/${encodeURIComponent(id)}`
    );
    if (response.status === 200) {
      setLoader(true);
      setData((prev) => ({
        ...prev,
        info: {
          count: prev.info.count - 1,
          pages:
            prev.info.count % PAGE_SIZE === 1
              ? prev.info.pages - 1
              : prev.info.pages,
        },
      }));
    }
  }
  return (
    <>
      {characters.length > 0 ? (
        characters.map((c) => (
          <CharCard {...c} key={c.id} handleDelete={handleDelete} />
        ))
      ) : (
        <NoResults />
      )}
    </>
  );
}

export default CharacterList;
