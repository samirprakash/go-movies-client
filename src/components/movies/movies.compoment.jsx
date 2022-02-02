import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    await fetch('http://localhost:4000/v1/movies')
      .then((response) => response.json())
      .then((json) => {
        setMovies(json.movies);
        setIsLoaded(true);
      });
  };

  if (!isLoaded) {
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
