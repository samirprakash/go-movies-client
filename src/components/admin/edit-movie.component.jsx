import { Fragment, useState } from 'react';

const EditMovie = () => {
  const [movie, setMovie] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  return (
    <Fragment>
      <h2>Add/Edit Movie</h2>
      <hr />

      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={movie.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="release_date" className="form-label">
            Release Date
          </label>
          <input
            type="text"
            className="form-control"
            id="release_date"
            name="release_date"
            value={movie.release_date}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="runtime" className="form-label">
            Runtime
          </label>
          <input
            type="text"
            className="form-control"
            id="runtime"
            name="runtime"
            value={movie.runtime}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mpaa_rating" className="form-label">
            MPAA Rating
          </label>
          <select className="form-select" value={movie.mpaa_rating}>
            <option value="choose" className="form-select">
              Choose ...
            </option>
            <option value="G" className="form-select">
              G
            </option>
            <option value="PG" className="form-select">
              PG
            </option>
            <option value="PG-13" className="form-select">
              PG-13
            </option>
            <option value="R" className="form-select">
              R
            </option>
            <option value="NC17" className="form-select">
              NC17
            </option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">
            Rating
          </label>
          <input
            type="text"
            className="form-control"
            id="rating"
            name="rating"
            value={movie.rating}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            cols="10"
            rows="3"
            className="form-control"
          >
            {movie.description}
          </textarea>
        </div>
        <hr />
        <button className="btn btn-primary">Save</button>
      </form>
    </Fragment>
  );
};

export default EditMovie;
