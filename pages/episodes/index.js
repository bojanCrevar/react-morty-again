import React, { useState, useEffect, Fragment } from "react";
import EpisodeList from "../../components/EpisodeList";
import axios from "axios";
import Pagination from "../../components/Pagination";
import Searchbar from "../../components/Searchbar";
import Link from "next/link";
import Button from "react-bootstrap/Button";

const EpisodesPage = () => {
  const [episodes, setEpisodes] = useState();
  const [pagesInfo, setPagesInfo] = useState({});
  const [activePage, setActivePage] = useState(1);
  const [keyword, setKeyword] = useState();

  async function fetchData() {
    const response = await axios.get("/api/episodes", {
      params: { activePage, keyword },
    });

    setEpisodes(response.data.results);
    setPagesInfo(response.data.info);
  }
  console.log("rerender iz epp pagea");
  useEffect(() => {
    if (activePage !== 1) {
      setActivePage(1);
    } else {
      fetchData();
    }
  }, [keyword]);

  useEffect(() => {
    fetchData();
  }, [activePage]);

  return (
    <div className="m-auto w-1/2 ">
      <h5 className="p-4 text-4xl	text-center">Rick & Morty list of episodes</h5>
      <Pagination
        pagesInfo={pagesInfo}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div>Pages: </div>
      <Searchbar setKeyword={setKeyword} />
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

export default EpisodesPage;
