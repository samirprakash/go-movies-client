import { useEffect, useState } from 'react';

const GQL = () => {
  const [movies, setMovies] = useState([]);

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
