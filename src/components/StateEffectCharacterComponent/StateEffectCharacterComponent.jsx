import React, { useState, useEffect } from "react";
import "./StateEffectCharacterComponent.css";
function StateEffectCharacterComponent() {
  const [characters, setCharacters] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [apiUrl, setUrl] = useState(
    "https://rickandmortyapi.com/api/character"
  );
  useEffect(() => {
    async function fetchCharacters() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setPages(data.info.pages);
        console.log(data.info.pages);
        setCharacters(data.results);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCharacters();
  }, [apiUrl]);
  if (characters.length === 0) {
    return <div>No Results Found</div>;
  }
  const handleStatus = (event) => {
    setUrl(
      "https://rickandmortyapi.com/api/character/?status=" + event.target.value
    );
  };
  const handlePages = (event) => {
    setCurrentPage(event.target.value);
    if (apiUrl === "https://rickandmortyapi.com/api/character") {
      setPages(0);
      setUrl(
        "https://rickandmortyapi.com/api/character/?page=" + event.target.value
      );
    } else {
      setPages(0);
      setUrl(apiUrl + "&page=" + event.target.value);
      console.log(apiUrl);
    }
  };
  return (
    <React.Fragment>
      <h3 className="heading">
        Rick and Morty Characters - Page {currentPage}
      </h3>
      <div className="option-container">
        <label htmlFor="status">Select the Status Filter: </label>
        <select
          htmlFor="charcaterStatus"
          className="status"
          onChange={handleStatus}
        >
          <option value="">All</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <div>
          <label htmlFor="pages">Select Page: </label>
          <select
            id="pages"
            value={currentPage}
            className="page"
            onChange={handlePages}
          >
            {Array.from({ length: pages }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="container">
        <div className="character-box">
          {characters.map((character) => (
            <div key={character.id} className="character">
              <img src={character.image} alt="character-image" />
              <div className="details">
                <dt>
                  <h2>{character.name}</h2>
                </dt>
                <dd>
                  <p>Species: {character.species}</p>
                  <p>Status: {character.status}</p>
                  <p>
                    Location of {character.name}: {character.location.name}
                  </p>
                </dd>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
export default StateEffectCharacterComponent;
