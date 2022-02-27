import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getGenres = async () => {
      fetch('http://localhost:4000/v1/genres')
        .then((response) => {
          if (response.status !== 200) {
            let err = Error;
            err.message = 'Invalid status code :' + response.status;
            setError(err);
          }
          return response.json();
        })
        .then(
          (json) => {
            setGenres(json.genres);
            setIsLoaded(true);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    };
    getGenres();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading ...</div>;
  } else {
    return (
      <Fragment>
        <h2>Genres</h2>

        <div className="list-group">
          {genres.map((genre) => (
            <Link
              key={genre.id}
              to={`/genres/${genre.id}`}
              state={{ genreName: genre.genre_name }}
              className="list-group-item list-group-item-action"
            >
              {genre.genre_name}
            </Link>
          ))}
        </div>
      </Fragment>
    );
  }
};

export default Genres;
