import React, { useState, useEffect } from "react";
import { useQuery, refetch } from "react-query";
import "./QueryCharacterComponent.css";
function QueryCharacterComponent() {
  const [page, setPage] = useState(1);
  const [apiUrl, setUrl] = useState(
    `https://rickandmortyapi.com/api/character/?page=`
  );

  const fetchCharacters = async ({ queryKey }) => {
    const response = await fetch(apiUrl + queryKey[1]);
    return response.json();
  };

  const { data, isPreviousData, isLoading, isError } = useQuery(
    ["characters", page],
    fetchCharacters,
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isError) {
    return (
      <React.Fragment>
        <div className="error-page">
          <h2>Sorry..</h2>
          <h3>There is some error loading the data</h3>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <h3 className="heading">Rick and Morty Characters</h3>
      <h5 className="heading">{page} Page</h5>
      <div>
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
        <div className="button-contain">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous Page
          </button>
          <button
            disabled={isPreviousData && !data.info.next}
            onClick={() => setPage(page + 1)}
          >
            Next Page
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default QueryCharacterComponent;
