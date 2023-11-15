import React, { useState } from "react";
import styles from "./Movie.module.scss";
import { MovieInterface } from "../../interfaces/MovieInterface";

interface MovieProps {
  movie: MovieInterface;
  handleDelete: (id: number) => void;
  handleUpdate: (id: number, updatedMovie: MovieInterface) => void;
}

const Movie = ({ movie, handleDelete, handleUpdate }: MovieProps) => {
  const { id, title, description, image } = movie;

  const [isEditing, setIsEditing] = useState(false);
  const [updatedMovie, setUpdatedMovie] = useState(movie);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUpdatedMovie(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleUpdate(id, updatedMovie);
    setIsEditing(false);
  };

  return (
      <div className={styles.card} key={id}>
          <img className={styles["card-image"]} src={image} alt={title} />
          <div>
              {isEditing ? (
                  <form className={styles["form"]} onSubmit={handleFormSubmit}>
                      <label className={styles["form-label"]}>
                          Title:
                          <input
                              className={styles["form-input"]}
                              type="text"
                              name="title"
                              value={updatedMovie.title}
                              onChange={handleInputChange}
                          />
                      </label>
                      <label className={styles["form-label"]}>
                          <br />
                          Description:
                          <br />
                          <textarea
                              className={styles["form-textarea"]}
                              name="description"
                              value={updatedMovie.description}
                              onChange={handleInputChange}
                          />
                      </label>
                      <br />
                      <button type="submit">Save</button> &nbsp;
                      <button type="button" onClick={() => setIsEditing(false)}>
                          Cancel
                      </button>
                  </form>
              ) : (
                  <>
                      <h3 className={styles["card-title"]}>{title}</h3>
                      <p className={styles["card-description"]}>
                          {description}
                      </p>
                      <button
                          className={styles["button-delete"]}
                          onClick={() => handleDelete(id)}
                      >
                          Delete
                      </button>
                      <button
                          className={styles["button-update"]}
                          onClick={() => setIsEditing(true)}
                      >
                          Update
                      </button>
                  </>
              )}
          </div>
      </div>
  );
};

export default Movie;
