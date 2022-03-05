import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const GQLMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const payload = `
    {
        movie(id: ${id}) {
            id
            title
            runtime
            year
            description
            release_date
            runtime
            rating
            mpaa_rating
            poster
        }
    }
    `;

    const getMovie = async () => {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      await fetch(`${process.env.REACT_APP_API_URL}/v1/graphql`, {
        method: 'POST',
        body: payload,
        headers: headers,
      })
        .then((response) => response.json())
        .then((data) => {
          setMovie(data.response.data.movie);
          setIsLoaded(true);
        });
    };
    getMovie();
  }, [id]);

  if (movie.genres) {
    movie.genres = Object.values(movie.genres);
  } else {
    movie.genres = [];
  }

  if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <h2>
          Movie: {movie.title} ({movie.year})
        </h2>

        {movie.poster !== '' && (
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster}`}
              alt="poster"
            />
          </div>
        )}

        <div className="float-start">
          <small>Rating: {movie.mpaa_rating}</small>
        </div>
        <div className="float-end">
          {movie.genres.map((m, index) => (
            <span className="badge bg-secondary me-1" key={index}>
              {m}
            </span>
          ))}
        </div>

        <div className="clearfix"></div>
        <hr />

        <table className="table table-compact table-striped">
          <thead></thead>
          <tbody>
            <tr>
              <td>
                <strong>Title</strong>
              </td>
              <td>{movie.title}</td>
            </tr>
            <tr>
              <td>
                <strong>Description</strong>
              </td>
              <td>{movie.description}</td>
            </tr>
            <tr>
              <td>
                <strong>Runtime</strong>
              </td>
              <td>{movie.runtime} minutes</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
};

export default GQLMovie;
