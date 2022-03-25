import React, { Dispatch, SetStateAction } from "react";
import CharCard from "./CharCard";
import axios from "axios";
import { CharactersItem } from "../../model/charactersModel";
import { ResponseData } from "../../model/ResponseDataModel";
import NoResults from "../NoResults";
//import { PAGE_SIZE } from "../../utils/apiResponse";
import { useSelector } from "react-redux";
import { RootState } from "../../model/storeModel";

type CharListProps = {
  characters: CharactersItem[];
  setData: Dispatch<SetStateAction<ResponseData<CharactersItem>>>;
  setLoader: Dispatch<SetStateAction<Boolean>>;
};

function CharacterList({ characters, setData, setLoader }: CharListProps) {
  const token = useSelector((state: RootState) => state.auth.token);

  async function handleDelete(id: string) {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_NODE_URL}/characters/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 200) {
      setLoader(true);
      setData((prev) => ({
        ...prev,
        info: {
          count: prev.info.count - 1,
          pages: prev.info.pages,
        },
      }));
    }
  }

  return (
    <>
      {characters.length > 0 ? (
        characters.map((c) => (
          <CharCard {...c} key={c._id} handleDelete={handleDelete} />
        ))
      ) : (
        <NoResults />
      )}
    </>
  );
}

export default CharacterList;
