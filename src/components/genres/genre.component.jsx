import { Fragment, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

const Genre = () => {
  const { id } = useParams();
  const { state } = useLocation();

  const [genreName] = useState(state.genreName);
  const [movies, setMovies] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMoviesByGenre = async () => {
      await fetch(`http://localhost:4000/v1/genres/${id}/movies/`)
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
    getMoviesByGenre();
  }, [id]);

  if (!movies) {
    setMovies([]);
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <Fragment>
        <h2>Genre: {genreName}</h2>

        <div className="list-group">
          {movies.map((movie) => (
            <Link
              to={`/movies/${movie.id}`}
              className="list-group-item list-group-item-action"
              key={movie.id}
            >
              {movie.title}
            </Link>
          ))}
        </div>
      </Fragment>
    );
  }
};

export default Genre;
