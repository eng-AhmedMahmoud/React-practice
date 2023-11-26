import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/errorPage";
import * as MoviesAPI from "./api/MoviesAPI";
import MovieList from "./components/MoviesList";
import MovieSearch from "./components/MovieSearch";
import { MovieInterface } from "./interfaces/MovieInterface";
import "./scss/App.scss";

const MoviesApp = () => {
  const [allMovies, setAllMovies] = useState<MovieInterface[]>([]);

 
  const fetchMovies = async () => {
    try {
      const movies = await MoviesAPI.getAllMovies();
      console.log(movies);
      setAllMovies(movies);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

   useEffect(() => {
       fetchMovies();
   }, []);

  const updateMovies = async (movie: MovieInterface, shelf: string) => {
    try {
      await MoviesAPI.updateMovie(movie, shelf);
      fetchMovies();
    } catch (error) {
      console.error("Failed to update movies:", error);
    }
  };
console.log(allMovies)
  return (
      <Router>
          <div className="app">
              <Routes>
                  <Route
                      path="/"
                      element={
                          <MovieList
                              movies={allMovies}
                              onChange={updateMovies}
                          />
                      }
                  />
                  <Route
                      path="/search"
                      element={
                          <MovieSearch
                              onChange={updateMovies}
                              searchableMovies={allMovies}
                          />
                      }
                  />
                  <Route path="*" element={<ErrorPage />} />
              </Routes>
          </div>
      </Router>
  );
};

export default MoviesApp;
