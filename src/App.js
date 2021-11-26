import React, { useEffect, useState } from "react";
import "./App.css";
import CharacterList from "./components/CharacterList";
import Searchbar from "./components/Searchbar";

const rmAPI = "https://rickandmortyapi.com/api/character";

function App() {
  const [chars, setChars] = useState([]);
  const [pageInfo, setPageInfo] = useState({ active: 1, size: 0 });
  const [keyWord, setKeyword] = useState({ active: 1, size: 0 });

  useEffect(() => {
    async function fetchData(keyword) {
      let response = await fetch(
        `${rmAPI}?page=${pageInfo.active}` + (keyword ? `&name=${keyword}` : "")
      );
      let data = await response.json();
      setChars(data.results);
      setPageInfo((prev) => ({ ...prev, size: data.info.pages }));
      console.log(data);
    }
    fetchData();
  }, [pageInfo, keyWord]);

  return (
    <div className="m-auto w-1/2 ">
      <h5 className="p-4 text-4xl	text-center">
        Rick & Morty characters - {chars.length}
      </h5>

      <Searchbar setKeyword={setKeyword} />
      <CharacterList
        characters={chars}
        pageInfo={pageInfo}
        setPageInfo={}
      ></CharacterList>
    </div>
  );
}

export default App;
