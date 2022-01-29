import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';

const Movie = () => {
  const { id } = useParams();
  const [movie] = useState({ id, title: 'Some Movie', runtime: 150 });

  return (
    <Fragment>
      <h2>
        {movie.title} {movie.id}
      </h2>

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
              <strong>Runtime</strong>
            </td>
            <td>{movie.runtime} minutes</td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

export default Movie;
