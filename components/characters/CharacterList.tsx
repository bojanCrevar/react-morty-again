import React, { Dispatch, SetStateAction } from "react";
import CharCard from "./CharCard";
import axios from "axios";
import { CharactersItem } from "../../model/charactersModel";
import { ResponseData } from "../../model/ResponseDataModel";
import NoResults from "../NoResults";
import { PAGE_SIZE } from "../../utils/apiResponse";
import { LoadersType } from "../../model/loaderModel";

type CharListProps = {
  characters: CharactersItem[];
  setData: Dispatch<SetStateAction<ResponseData<CharactersItem>>>;
  setLoaders: Dispatch<SetStateAction<LoadersType>>;
};

function CharacterList({ characters, setData, setLoaders }: CharListProps) {
  async function handleDelete(id: number) {
    const response = await axios.delete(
      `/api/characters/${encodeURIComponent(id)}`
    );
    if (response.status === 200) {
      setLoaders((prev) => ({ ...prev, spinLoader: true }));
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
