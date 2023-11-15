import React, { useState } from "react";
import moviesData from "../../Data/MoviesData";
import Movie from "../Movie/Movie";
import styles from "./Movies.module.scss";

const Movies = () => {
  const [movies, setMovies] = useState([...moviesData]);

  const handleDelete = (id: number) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  const handleUpdate = (id: number, updatedMovie: any) => {
    setMovies(movies.map((movie) => {
      if (movie.id === id) {
        return {
          ...movie,
          ...updatedMovie
        };
      } else {
        return movie;
      }
    }));
  };

  return (
    <div className={styles.container}>
      {movies.map((movie) => (
        <Movie
          key={movie.id}
          movie={movie}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default Movies;
