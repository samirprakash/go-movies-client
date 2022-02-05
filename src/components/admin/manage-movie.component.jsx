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
  const [mpaaOptions] = useState([
    { id: 1, value: 'G', label: 'G' },
    { id: 2, value: 'PG', label: 'PG' },
    { id: 3, value: 'PG-13', label: 'PG-13' },
    { id: 4, value: 'R', label: 'R' },
    { id: 5, value: 'NC17', label: 'NC17' },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submitting form', movie);
  };

  const handleChange = (event) => {
    setMovie({
      name: event.target.name,
      value: event.target.value,
    });
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
  }, []);

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
            label="Title"
            value={movie.title || ''}
            fn={handleChange}
          />
          <Input
            name="release_date"
            label="Release Date"
            value={movie.release_date || ''}
            fn={handleChange}
          />
          <Input
            name="runtime"
            label="Runtime"
            value={movie.runtime || ''}
            fn={handleChange}
          />
          <Select
            name="mpaa_rating"
            label="MPAA Rating"
            value={movie.mpaa_rating || ''}
            fn={handleChange}
            options={mpaaOptions}
          ></Select>
          <Input
            name="rating"
            label="Rating"
            value={movie.rating || ''}
            fn={handleChange}
          />
          <TextArea
            name="description"
            label="Description"
            cols="10"
            rows="3"
            value={movie.description || ''}
            fn={handleChange}
          ></TextArea>
          <hr />
          <button className="btn btn-primary">Save</button>
        </form>
      </Fragment>
    );
  }
};

export default ManageMovie;
