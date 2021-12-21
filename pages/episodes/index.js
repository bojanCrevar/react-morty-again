import React, { useState, useEffect, Fragment } from "react";
import EpisodeList from "../../components/EpisodeList";
import axios from "axios";
import Pagination from "../../components/Pagination";
import Searchbar from "../../components/Searchbar";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import { setNestedObjectValues } from "formik";
import SortComponent from "../../components/SortComponent";

const EpisodesPage = () => {
  const [episodes, setEpisodes] = useState();
  const [pagesInfo, setPagesInfo] = useState({});
  const [activePage, setActivePage] = useState(1);
  const [keyword, setKeyword] = useState();
  const [sort, setSort] = useState("id");

  async function fetchData() {
    const response = await axios.get("/api/episodes", {
      params: { activePage, keyword, sort },
    });

    setEpisodes(response.data.results);
    setPagesInfo(response.data.info);
  }
  useEffect(() => {
    fetchData();
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
      <Searchbar setKeyword={setKeyword} setActivePage={setActivePage} />
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

export default EpisodesPage;
