import React, { useEffect, useState } from "react";
import "./App.css";
import CharacterList from "./components/CharacterList";
import Searchbar from "./components/Searchbar";
const rmAPI = "https://rickandmortyapi.com/api/character";

function App() {
  const [chars, setChars] = useState([]);
  async function fetchData(keyword) {
    let response = await fetch(keyword ? `${rmAPI}?name=${keyword}` : rmAPI);
    let data = await response.json();
    setChars(data.results);
    console.log(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="m-auto w-1/2 ">
      <h5 className="p-4 text-4xl	text-center">
        Rick & Morty characters - {chars.length}
      </h5>

      <Searchbar fetchData={fetchData} />
      <CharacterList characters={chars}></CharacterList>
    </div>
  );
}

export default App;
