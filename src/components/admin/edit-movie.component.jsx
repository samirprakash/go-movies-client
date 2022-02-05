import { Fragment, useReducer, useState } from 'react';
import Input from '../ui/form-input.component';
import Select from '../ui/form-select.component';
import TextArea from '../ui/form-textarea.component';

const EditMovie = () => {
  const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value,
    };
  };

  const [movie, setMovie] = useReducer(formReducer, {});
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

    console.log(movie);
  };

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
};

export default EditMovie;
