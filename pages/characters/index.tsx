import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import CharacterList from "../../components/CharacterList";
import Pagination from "../../components/Pagination";
import Searchbar from "../../components/Searchbar";
import axios from "axios";
import SortComponent from "../../components/SortComponent";
import { useRouter } from "next/router";
import CharactersSkeleton from "../../components/skeletons/CharactersSkeleton";
import { GetServerSidePropsContext } from "next/types";
import { ResponseData } from "../../model/charactersModel";
import FilterPanel from "../../components/FilterPanel";

function Characters() {
  const router = useRouter();
  const [activePage, setActivePage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>("");
  const [sort, setSort] = useState<string>("id");
  const [data, setData] = useState<ResponseData>({
    info: { count: 1, pages: 1 },
    results: [],
  });
  const { results: chars, info: pagesInfo } = data;

  async function fetchData() {
    const response = await axios.get("/api/characters", {
      params: { activePage, keyword, sort },
    });
    setData(response.data);
  }

  useEffect(() => {
    fetchData();
    const keywordQuery = keyword ? `&keyword=${keyword}` : "";
    router.push(
      `?activePage=${activePage}${keywordQuery}&sort=${sort}`,
      undefined,
      {
        shallow: true,
      }
    );
  }, [activePage, keyword, sort]);

  const filterConfig: {
    title: string;
    values: string[];
    type: "checkbox" | "radio";
  }[] = [
    {
      title: "Gender",
      values: ["Male", "Female", "Genderless"],
      type: "checkbox",
    },
    {
      title: "Testing",
      values: ["1", "2", "3"],
      type: "radio",
    },
    {
      title: "Status",
      values: ["Dead", "Alive", "Unknown"],
      type: "checkbox",
    },
    {
      title: "Status2",
      values: ["Dead", "Alive", "Unknown"],
      type: "radio",
    },
  ];

  function submitHandler(e: any) {
    e.preventDefault();
    console.log("Submit");
  }

  return (
    <div className="flex mb-4 w-full">
      <div className="w-1/4">
        <div className="w-1/2 ml-28 mt-44">
          <FilterPanel
            filterConfig={filterConfig}
            submitHandler={submitHandler}
            date={true}
          />
        </div>
      </div>
      <div className="w-2/4 ">
        <div>
          <h5 className="p-4 text-4xl	text-center">
            List of characters - {pagesInfo.count}
          </h5>
          <Pagination
            pagesInfo={pagesInfo}
            activePage={activePage}
            setActivePage={setActivePage}
          />
          <div>Pages: {pagesInfo.pages}</div>
          <Searchbar
            setKeyword={setKeyword}
            setActivePage={setActivePage}
            initKeyword={keyword}
          />
          <div className="pt-4 relative">
            <Link href="characters/create">
              <Button variant="success w-1/2" type="submit">
                Add character!
              </Button>
            </Link>
            <SortComponent setSort={setSort} initSort={sort} />
          </div>
          <div className="mt-8">
            {chars.length ? (
              <CharacterList characters={chars} fetchData={fetchData} />
            ) : (
              <CharactersSkeleton amount={10} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  return { props: { query: query || null } };
}

export default Characters;
