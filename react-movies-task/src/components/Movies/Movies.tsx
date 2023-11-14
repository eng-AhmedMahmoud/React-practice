import React from "react";
import movies from "../../Data/MoviesData";
import Movie from "../Movie/Movie";
import styles from "./Movies.module.scss";

const Movies = () => {
    return (
        <div className={styles.container}>
            {movies.map((movie) => (
                <Movie key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default Movies;
