import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Admin from './components/admin/admin.component';
import EditMovie from './components/admin/edit-movie.component';
import Genre from './components/genres/genre.component';
import Genres from './components/genres/genres.component';
import Home from './components/home/home.component';
import Movie from './components/movies/movie.component';
import Movies from './components/movies/movies.component';

function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="container">
          <div className="row">
            <h1 className="mt-3">Go Watch a Movie!</h1>
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
                  <li className="list-group-item">
                    <Link to="/admin/movies/0">Add Movie</Link>
                  </li>
                  <li className="list-group-item">
                    <Link to="/admin">Admin</Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="col-md-10">
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="movies" element={<Movies />}></Route>
                <Route path="movies/:id" element={<Movie />}></Route>
                <Route exact path="genres" element={<Genres />}></Route>
                <Route exact path="genres/:id" element={<Genre />}></Route>
                <Route path="admin" element={<Admin />}></Route>
                <Route
                  exact
                  path="admin/movies/:id"
                  element={<EditMovie />}
                ></Route>
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
