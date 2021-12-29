import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import CharacterList from "../../components/CharacterList";
import Pagination from "../../components/Pagination";
import Searchbar from "../../components/Searchbar";
import axios from "axios";
import SortComponent from "../../components/SortComponent";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next/types";
import { ResponseData } from "../../model/charactersModel";

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

  return (
    <div className="m-auto w-3/4 2xl:w-1/2">
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
        {chars ? (
          <CharacterList characters={chars} fetchData={fetchData} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  return { props: { query: query || null } };
}

export default Characters;
