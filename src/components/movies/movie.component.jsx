import { useParams } from 'react-router-dom';

const Movie = () => {
  const { id } = useParams();

  return <div>Movie {id}</div>;
};

export default Movie;
