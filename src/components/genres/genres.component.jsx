import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getGenres();
  }, []);

  const getGenres = async () => {
    fetch('http://localhost:4000/v1/genres')
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
          setGenres(json.genres);
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
    return <div>Loading ...</div>;
  } else {
    return (
      <Fragment>
        <h2>Genres</h2>

        <ul>
          {genres.map((genre) => (
            <li key={genre.id}>
              <Link to={`/genres/${genre.id}`}>{genre.genre_name}</Link>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
};

export default Genres;
