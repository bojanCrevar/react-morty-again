import React, { useState, useEffect } from "react";
import EpisodeList from "../../components/EpisodeList";
import axios from "axios";
import Pagination from "../../components/Pagination";
import Searchbar from "../../components/Searchbar";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";

const EpisodesPage = (props) => {
  const router = useRouter();

  const [episodes, setEpisodes] = useState();
  const [pagesInfo, setPagesInfo] = useState({});
  const [activePage, setActivePage] = useState(+props?.query?.activePage || 1);
  const [keyword, setKeyword] = useState(props?.query?.keyword || "");

  async function fetchData() {
    const response = await axios.get("/api/episodes", {
      params: { activePage, keyword },
    });

    setEpisodes(response.data.results);
    setPagesInfo(response.data.info);
  }

  useEffect(() => {
    fetchData();
    const keywordQuery = keyword ? `&keyword=${keyword}` : "";
    router.push(`?activePage=${activePage}${keywordQuery}`, undefined, {
      shallow: true,
    });
  }, [activePage, keyword]);

  return (
    <div className="m-auto w-1/2 ">
      <h5 className="p-4 text-4xl	text-center">Rick & Morty list of episodes</h5>
      <Pagination
        pagesInfo={pagesInfo}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div>Pages: </div>
      <Searchbar
        setKeyword={setKeyword}
        initKeyword={keyword}
        setActivePage={setActivePage}
      />
      <div className="pt-4">
        <Link href="/episodes/create">
          <Button variant="success w-1/2" type="submit">
            Add episode
          </Button>
        </Link>
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
