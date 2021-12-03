import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import CharacterList from "../components/CharacterList";
import Pagination from "../components/Pagination";
import Searchbar from "../components/Searchbar";
import axios from "axios";
import Link from "next/link";

function Index() {
  const [chars, setChars] = useState([]);
  const [charactersInfo, setCharactersInfo] = useState({});
  const [activePage, setActivePage] = useState(1);
  const [keyword, setKeyword] = useState();

  async function fetchData() {
    const response = await axios.get("/api/characters", {
      params: { activePage, keyword },
    });
    setChars(response.data.results);
    setCharactersInfo(response.data.info);
  }

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
      <h5 className="p-4 text-4xl	text-center">
        Rick & Morty characters - {chars && chars.length}
      </h5>

      <Pagination
        charactersInfo={charactersInfo}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div>Characters:{charactersInfo.count} </div>

      <Searchbar setKeyword={setKeyword} />
      <div className="pt-4">
        <Link href="/create-character">
          <Button variant="success w-1/2" type="submit">
            Add character!
          </Button>
        </Link>
      </div>
      <CharacterList characters={chars} />
    </div>
  );
}

export default Index;
