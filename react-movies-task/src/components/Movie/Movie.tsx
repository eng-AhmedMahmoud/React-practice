import React from "react";
import styles from "./Movie.module.scss";

const Movie = (props: any) => {
    const movie = { ...props.movie };
    return (
        <div className={styles.card} key={movie.id}>
            <img
                className={styles["card-image"]}
                src={movie.image}
                alt={movie.title}
            />
          <div>
              <h3 className={styles["card-title"]}> {movie.title}</h3>
              <p className={styles["card-description"]}> {movie.description}</p>
          </div>
        </div>
    );
};

export default Movie;
