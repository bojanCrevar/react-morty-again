import { useState } from "react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import CharacterList from "../../components/characters/CharacterList";
import CharactersSkeleton from "../../components/skeletons/CharactersSkeleton";
import { FilterGroupConfig } from "../../model/filterModel";
import PageWrapper from "../../components/PageWrapper";
import { QueryParams } from "../../model/queryParams";
import { GetServerSideProps } from "next";
import { ResponseData } from "../../model/ResponseDataModel";
import { CharactersItem } from "../../model/charactersModel";
import { emptyPagination } from "../../model/paginationModel";
import { RMItem } from "../../model/RMItem";
import Loader from "../../components/Spinner";

export const filterConfig: FilterGroupConfig[] = [
  {
    title: "Gender",
    values: ["Male", "Female", "Unknown"],
    type: "checkbox",
    key: "gender",
  },

  {
    title: "Status",
    values: ["Dead", "Alive", "Unknown"],
    type: "checkbox",
    key: "status",
  },
];

function Characters({ query }: { query: QueryParams }) {
  const [skeleton, setSkeleton] = useState<Boolean>(true);
  const [loader, setLoader] = useState<Boolean>(false);
  const [data, setData] = useState<ResponseData<CharactersItem>>({
    info: emptyPagination,
    results: [],
  });
  const { results: chars, info: pagesInfo } = data;

  const addNewItemBtn = {
    href: "/characters/create",
    content: "Add character",
  };

  return (
    <PageWrapper
      title={"List of characters"}
      addNewItemBtn={addNewItemBtn}
      query={query}
      setData={setData as (data: ResponseData<RMItem>) => void}
      filterConfig={filterConfig}
      pagesInfo={pagesInfo}
      api={"characters"}
      setSkeleton={setSkeleton as (bool: Boolean) => void}
      setLoader={setLoader as (bool: Boolean) => void}
    >
      {skeleton && <CharactersSkeleton amount={10} />}
      {loader ? (
        <Loader />
      ) : (
        <CharacterList
          characters={chars}
          setData={setData}
          setLoader={setLoader}
        />
      )}
    </PageWrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { query: query || null } };
};

export default Characters;
