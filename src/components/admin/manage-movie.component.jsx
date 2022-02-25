import { Fragment, useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../ui/form-input.component';
import Select from '../ui/form-select.component';
import TextArea from '../ui/form-textarea.component';

const ManageMovie = () => {
  const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value,
    };
  };

  const { id } = useParams();
  const [movie, setMovie] = useReducer(formReducer, {});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);
  const [mpaaOptions] = useState([
    { id: 1, value: 'G', label: 'G' },
    { id: 2, value: 'PG', label: 'PG' },
    { id: 3, value: 'PG-13', label: 'PG-13' },
    { id: 4, value: 'R', label: 'R' },
    { id: 5, value: 'NC17', label: 'NC17' },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();

    let errors = [];
    movie.id = id;
    if (movie.title === undefined) {
      errors.push('title');
    }
    if (movie.release_date === undefined) {
      errors.push('release_date');
    }
    if (movie.runtime === undefined) {
      errors.push('runtime');
    }
    if (movie.mpaa_rating === undefined) {
      errors.push('mpaa_rating');
    }
    if (movie.rating === undefined) {
      errors.push('rating');
    }
    if (movie.description === undefined) {
      errors.push('description');
    }

    console.log(errors);

    setErrors(errors);
    if (errors.length > 0) {
      return false;
    }

    const requestOptions = { method: 'POST', body: JSON.stringify(movie) };
    fetch('http://localhost:4000/v1/admin/movies', requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const handleChange = (event) => {
    setMovie({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const hasError = (key) => {
    return errors.indexOf(key) !== -1;
  };

  useEffect(() => {
    const getMovie = async () => {
      await fetch(`http://localhost:4000/v1/movies/${id}`)
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
            const releaseDate = new Date(json.movie.release_date);

            setMovie({ name: 'id', value: id });
            setMovie({ name: 'title', value: json.movie.title });
            setMovie({
              name: 'release_date',
              value: releaseDate.toISOString().split('T')[0],
            });
            setMovie({ name: 'runtime', value: json.movie.runtime });
            setMovie({ name: 'mpaa_rating', value: json.movie.mpaa_rating });
            setMovie({ name: 'rating', value: json.movie.rating });
            setMovie({ name: 'description', value: json.movie.description });
            setIsLoaded(true);
          },
          (error) => {
            console.log(error);
            setIsLoaded(true);
            setError(error);
          }
        );
    };

    if (id > 0) {
      getMovie();
    } else {
      setIsLoaded(true);
    }
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <Fragment>
        <h2>Add/Edit Movie</h2>
        <hr />

        <form onSubmit={handleSubmit}>
          <Input
            name="title"
            className={hasError('title') ? 'is-invalid' : ''}
            label="Title"
            value={movie.title || ''}
            fn={handleChange}
            errorDiv={hasError('title') ? 'text-danger' : 'd-none'}
            errorMsg="Please enter a title"
          />
          <Input
            name="release_date"
            className={hasError('release_date') ? 'is-invalid' : ''}
            label="Release Date"
            value={movie.release_date || ''}
            fn={handleChange}
            errorDiv={hasError('release_date') ? 'text-danger' : 'd-none'}
            errorMsg="Please enter a release date"
          />
          <Input
            name="runtime"
            className={hasError('runtime') ? 'is-invalid' : ''}
            label="Runtime"
            value={movie.runtime || ''}
            fn={handleChange}
            errorDiv={hasError('runtime') ? 'text-danger' : 'd-none'}
            errorMsg="Please enter the total rumtime"
          />
          <Select
            name="mpaa_rating"
            className={hasError('mpaa_rating') ? 'is-invalid' : ''}
            label="MPAA Rating"
            value={movie.mpaa_rating || ''}
            fn={handleChange}
            options={mpaaOptions}
            errorDiv={hasError('mpaa_rating') ? 'text-danger' : 'd-none'}
            errorMsg="Please enter the MPAA rating"
          ></Select>
          <Input
            name="rating"
            className={hasError('rating') ? 'is-invalid' : ''}
            label="Rating"
            value={movie.rating || ''}
            fn={handleChange}
            errorDiv={hasError('rating') ? 'text-danger' : 'd-none'}
            errorMsg="Please enter the rating"
          />
          <TextArea
            name="description"
            className={hasError('description') ? 'is-invalid' : ''}
            label="Description"
            cols="10"
            rows="3"
            value={movie.description || ''}
            fn={handleChange}
            errorDiv={hasError('description') ? 'text-danger' : 'd-none'}
            errorMsg="Please enter a description"
          ></TextArea>
          <hr />
          <button className="btn btn-primary">Save</button>
        </form>
      </Fragment>
    );
  }
};

export default ManageMovie;
