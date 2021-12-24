import React, { useState, useEffect } from "react";
import EpisodeList from "../../components/EpisodeList";
import axios from "axios";
import Pagination from "../../components/Pagination";
import Searchbar from "../../components/Searchbar.tsx";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import SortComponent from "../../components/SortComponent.tsx";
import { useRouter } from "next/router";

const EpisodesPage = (props) => {
  const router = useRouter();
  const [activePage, setActivePage] = useState(+props?.query?.activePage || 1);
  const [keyword, setKeyword] = useState(props?.query?.keyword || "");
  const [sort, setSort] = useState("id");
  const [data, setData] = useState({});
  const { results: episodes, info: pagesInfo = {} } = data;

  async function fetchData() {
    const response = await axios.get("/api/episodes", {
      params: { activePage, keyword, sort },
    });
    setData(response.data);
  }

  useEffect(() => {
    fetchData();
    const keywordQuery = keyword ? `&keyword=${keyword}` : "";
    const sortQuery = sort ? `&sort=${sort}` : "";
    router.push(
      `?activePage=${activePage}${keywordQuery}${sortQuery}`,
      undefined,
      {
        shallow: true,
      }
    );
  }, [activePage, keyword, sort]);

  return (
    <div className="m-auto w-1/2 ">
      <h5 className="p-4 text-4xl	text-center">
        List of episodes - {pagesInfo.count}
      </h5>
      <Pagination
        pagesInfo={pagesInfo}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div>Pages: {pagesInfo.pages}</div>
      <Searchbar
        setKeyword={setKeyword}
        initKeyword={keyword}
        setActivePage={setActivePage}
      />
      <div className="pt-4 relative">
        <Link href="/episodes/create">
          <Button variant="success w-1/2" type="submit">
            Add episode
          </Button>
        </Link>
        <SortComponent setSort={setSort} />
      </div>
      <div className="mt-8">
        {episodes ? <EpisodeList episodes={episodes} /> : <div>loading</div>}
      </div>
    </div>
  );
};

export async function getServerSideProps({ query }) {
  return { props: { query: query || null } };
}

export default EpisodesPage;
