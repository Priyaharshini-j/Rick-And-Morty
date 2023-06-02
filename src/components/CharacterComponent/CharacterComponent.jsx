import React from "react";
import { useQuery } from "react-query";

import "./CharacterComponent.css";

function CharacterComponent() {
  const getCharacters = async () => {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    console.log(data);
    return data;
  };

  const { data, status } = useQuery("characters", getCharacters);

  if (status === "loading") {
    return <h3>Loading.....</h3>;
  }

  if (status === "error") {
    return <h3>Error occurred while fetching data</h3>;
  }

  return (
    <div>
      <h2>Characters Details</h2>
      {data.results.map((character) => (
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
  );
}

export default CharacterComponent;
