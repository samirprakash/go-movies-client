import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Admin from './components/admin/admin.component';
import ManageMovie from './components/admin/manage-movie.component';
import Genre from './components/genres/genre.component';
import Genres from './components/genres/genres.component';
import GQL from './components/gql/gql.component';
import Home from './components/home/home.component';
import Login from './components/login/login.component';
import Movie from './components/movies/movie.component';
import Movies from './components/movies/movies.component';

function App() {
  const [JWT, setJWT] = useState('');

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      if (JWT === '') {
        setJWT(JSON.parse(token));
      }
    }
  }, [JWT]);

  const handleJWTChange = (jwt) => {
    setJWT(jwt);
  };

  const logout = () => {
    setJWT('');
    window.localStorage.removeItem('token');
  };

  return (
    <BrowserRouter>
      <div>
        <div className="container">
          <div className="row">
            <div className="col">
              <h1 className="mt-3">Go Watch a Movie!</h1>
            </div>
            {JWT === '' ? (
              <div className="col mt-4 text-end">
                <Link to="/login">Login</Link>
              </div>
            ) : (
              <div className="col mt-4 text-end">
                <Link to="/" onClick={logout}>
                  Logout
                </Link>
              </div>
            )}
            <hr className="mb-3"></hr>
          </div>

          <div className="row">
            <div className="col-md-2">
              <nav>
                <ul className="list-group">
                  <li className="list-group-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="list-group-item">
                    <Link to="/movies">Movies</Link>
                  </li>
                  <li className="list-group-item">
                    <Link to="/genres">Genres</Link>
                  </li>
                  {JWT === '' ? (
                    <></>
                  ) : (
                    <>
                      <li className="list-group-item">
                        <Link to="/admin/movies/0">Add Movie</Link>
                      </li>
                      <li className="list-group-item">
                        <Link to="/admin">Admin</Link>
                      </li>
                    </>
                  )}
                  <li className="list-group-item">
                    <Link to="/gql">GQL</Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="col-md-10">
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route
                  path="login"
                  element={<Login handleJWT={handleJWTChange} />}
                ></Route>
                <Route
                  path="movies"
                  element={<Movies token={JWT} isAdmin={false} />}
                ></Route>
                <Route
                  path="movies/:id"
                  element={<Movie isAdmin={false} />}
                ></Route>
                <Route exact path="genres" element={<Genres />}></Route>
                <Route exact path="genres/:id" element={<Genre />}></Route>
                <Route
                  path="admin"
                  element={<Admin token={JWT} isAdmin={true} />}
                ></Route>
                <Route
                  exact
                  path="admin/movies/:id"
                  element={<ManageMovie token={JWT} />}
                ></Route>
                <Route exact path="gql" element={<GQL />}></Route>
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
