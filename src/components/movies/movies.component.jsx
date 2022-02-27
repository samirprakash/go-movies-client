import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Movies = ({ isAdmin }) => {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      await fetch('http://localhost:4000/v1/movies')
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
            setMovies(json.movies);
            setIsLoaded(true);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    };
    getMovies();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <Fragment>
        <h2>{isAdmin ? 'Manage catalogue' : 'Choose a movie'}</h2>

        <div className="list-group">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={isAdmin ? `/admin/movies/${movie.id}` : `/movies/${movie.id}`}
              className="list-group-item list-group-item-action"
            >
              {movie.title}
            </Link>
          ))}
        </div>
      </Fragment>
    );
  }
};

export default Movies;
