import { useEffect, useReducer, useState } from 'react';
import Input from '../ui/form-input.component';

const GQL = () => {
  const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value,
    };
  };

  const [movies, setMovies] = useState([]);
  const [gql, setGql] = useReducer(formReducer, {});

  const handleSearch = (event) => {
    setGql({
      name: event.target.name,
      value: event.target.value,
    });

    doSearch();
  };

  const doSearch = async () => {
    const payload = `
    {
      search(titleContains: "${gql.search}") {
        id
        title
        runtime
        year
        description
      }
    }
    `;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    await fetch('http://localhost:4000/v1/graphql', {
      method: 'POST',
      body: payload,
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => Object.values(data.response.data.search))
      .then((responseList) => {
        if (responseList.length > 0) {
          setMovies(responseList);
        } else {
          setMovies([]);
        }
      });
  };

  useEffect(() => {
    const payload = `
      {
          list {
              id
              title
              runtime
              year
              description
          }
      }
      `;

    const getMovies = async () => {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      await fetch('http://localhost:4000/v1/graphql', {
        method: 'POST',
        body: payload,
        headers: headers,
      })
        .then((response) => response.json())
        .then((data) => Object.values(data.response.data.list))
        .then((responseList) => setMovies(responseList));
    };
    getMovies();
  }, []);

  return (
    <>
      <h2>GraphQL</h2>
      <hr />
      <Input
        name="search"
        value={gql.search || ''}
        fn={handleSearch}
        placeholder="Search Movies"
      />
      <div className="list-group">
        {movies.map((m) => (
          <a
            key={m.id}
            className="list-group-item list-group-item-action"
            href="#!"
          >
            <strong>{m.title}</strong>
            <br />
            <small className="text-muted">
              ({m.year}) - {m.runtime} minutes
            </small>
            <br />
            {m.description.slice(0, 100)}...
          </a>
        ))}
      </div>
    </>
  );
};

export default GQL;
