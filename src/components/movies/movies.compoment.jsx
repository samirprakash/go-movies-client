import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    await fetch('http://localhost:4000/v1/movies')
      .then((response) => {
        console.log('Status code is : ', response.status);
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
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <Fragment>
        <h2>Choose a movie</h2>

        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
};

export default Movies;
