import { useState } from "react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import CharacterList from "../../components/characters/CharacterList";
import CharactersSkeleton from "../../components/skeletons/CharactersSkeleton";
import { ResponseData } from "../../model/charactersModel";
import { FilterGroupConfig } from "../../model/filterModel";
import PageWrapper from "../../components/PageWrapper";
import { QueryParams } from "../../model/queryParams";
import { GetServerSideProps } from "next";

function Characters({ query }: { query: QueryParams }) {
  const [data, setData] = useState<ResponseData>({
    info: { count: 0, pages: 1 },
    results: [],
  });
  const { results: chars, info: pagesInfo } = data;

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
      setCharData={setData}
      filterConfig={filterConfig}
      pagesInfo={pagesInfo}
      api={"characters"}
    >
      {chars.length ? (
        <CharacterList characters={chars} />
      ) : (
        <CharactersSkeleton amount={10} />
      )}
    </PageWrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { query: query || null } };
};

export default Characters;
