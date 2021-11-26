import React, { useEffect, useState } from "react";
import "./App.css";
import CharacterList from "./components/CharacterList";
import Pagination from "./components/Pagination";
import Searchbar from "./components/Searchbar";
const rmAPI = "https://rickandmortyapi.com/api/character";

function App() {
  const [chars, setChars] = useState([]);
  const [pagesInfo, setPagesInfo] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [keyword, setKeyword] = useState();

  // function setActivePage(newActive) {
  //   fetchData(keyword, newActive);
  // }

  async function fetchData() {
    
    let pageQueryParam = `?page=${activePage}`;
    let nameQueryParam = keyword ? `&name=${keyword}` : '';

    let response = await fetch(`${rmAPI}/${pageQueryParam}${nameQueryParam}`);

    let data = await response.json();
    setChars(data.results);
    setPagesInfo(data.info);
    console.log(data);
  }
  
  useEffect(() => {
    fetchData();
  }, [keyword, activePage]);

  return (
    <div className="m-auto w-1/2 ">
      <h5 className="p-4 text-4xl	text-center">
        Rick & Morty characters - {chars.length}
      </h5>

      <Pagination pages={pagesInfo} activePage={activePage} setActivePage={setActivePage}></Pagination>
      <div>Pages:{pagesInfo.count} </div>
      <Searchbar setKeyword={setKeyword} />
      <CharacterList characters={chars}></CharacterList>
    </div>
  );
}

export default App;
