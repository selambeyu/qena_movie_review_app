import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import MoviesListPage from "./pages/movies/MoviesList";
import MovieDetailsPage from "./pages/movies/MovieDetail";
import AddUserPage from "./pages/users/AddUser";
import AddMoviePage from "./pages/movies/AddMovie";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<MoviesListPage />} />
          <Route path="/movies/:movieId" exact element={<MovieDetailsPage />} />
          <Route path="/movies/new" exact element={<AddMoviePage />} />
          <Route path="/users/new" exact element={<AddUserPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
