import { Fragment } from 'react';
import { Link, useMatch } from 'react-router-dom';

const Categories = () => {
  const match = useMatch('/categories');

  return (
    <Fragment>
      <h2>Categories</h2>

      <ul>
        <li>
          <Link to={`${match.pathname}/comedy`}>Comedy</Link>
        </li>
        <li>
          <Link to={`${match.pathname}/drama`}>Drama</Link>
        </li>
      </ul>
    </Fragment>
  );
};

export default Categories;
