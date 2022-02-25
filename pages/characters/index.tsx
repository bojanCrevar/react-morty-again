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
import { LoadersType } from "../../model/loaderModel";

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
  const [loaders, setLoaders] = useState<LoadersType>({
    spinLoader: false,
    skeletonLoader: true,
  });
  const [data, setData] = useState<ResponseData<CharactersItem>>({
    info: emptyPagination,
    results: [],
  });
  const { spinLoader, skeletonLoader } = loaders;
  const { results: chars, info: pagesInfo } = data;

  const buttonAdd = (
    <Link href="/characters/create">
      <Button variant="success w-full lg:w-4/5" type="submit">
        Add character
      </Button>
    </Link>
  );

  return (
    <PageWrapper
      title={"List of characters"}
      buttonAdd={buttonAdd}
      query={query}
      setData={setData as (data: ResponseData<RMItem>) => void}
      filterConfig={filterConfig}
      pagesInfo={pagesInfo}
      api={"characters"}
      setLoaders={setLoaders}
    >
      {skeletonLoader && <CharactersSkeleton amount={10} />}
      {spinLoader ? (
        <Loader />
      ) : (
        <CharacterList
          characters={chars}
          setData={setData}
          setLoaders={setLoaders}
        />
      )}
    </PageWrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { query: query || null } };
};

export default Characters;
