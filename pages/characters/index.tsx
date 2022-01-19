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

function Characters({ query }: { query: QueryParams }) {
  const [skeleton, setSkeleton] = useState<Boolean>(true);
  const [data, setData] = useState<ResponseData<CharactersItem>>({
    info: emptyPagination,
    results: [],
  });
  const { results: chars, info: pagesInfo } = data;

  console.log("skeleton", skeleton);

  const filterConfig: FilterGroupConfig[] = [
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
      setSkeleton={setSkeleton as (bool: Boolean) => void}
    >
      {chars.length ? (
        <CharacterList characters={chars} setData={setData} />
      ) : skeleton ? (
        <CharactersSkeleton amount={10} />
      ) : (
        <div className="bg-white rounded mt-8 text-center text-lg p-3">
          No data found!
        </div>
      )}
    </PageWrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { query: query || null } };
};

export default Characters;
