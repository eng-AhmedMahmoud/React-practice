import React, { useState } from "react";
import { MovieInterface } from "../interfaces/MovieInterface";

interface MovieProps {
    movie: MovieInterface;
    setMoviesData: React.Dispatch<React.SetStateAction<MovieInterface[]>>;
    onUpdate: (movie: MovieInterface, shelf: string) => void;
}

const Movie = ({ movie, setMoviesData, onUpdate }: MovieProps) => {
    const { id, title, description, image } = movie;

    const [isEditing, setIsEditing] = useState(false);
    const [updatedMovie, setUpdatedMovie] = useState(movie);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setUpdatedMovie((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setMoviesData((prevMoviesData) => {
            return prevMoviesData.map((prevMovie) => {
                if (prevMovie.id === id) {
                    return {
                        ...prevMovie,
                        ...updatedMovie,
                    };
                } else {
                    return prevMovie;
                }
            });
        });

        setIsEditing(false);
    };

    const handleDelete = (id: number) => {
        setMoviesData((prevMoviesData) =>
            prevMoviesData.filter((prevMovie) => prevMovie.id !== id)
        );
    };



    const updateMovieShelf = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onUpdate(movie, e.target.value);
    };

    return (
        <li className="card" key={id}>
            <div className="movie">
                <div className="movie-top">
                    <div
                        className="movie-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url("${image}")`,
                        }}
                    />
                    <div className="movie-shelf-changer">
                        <select onChange={updateMovieShelf} value={movie.shelf}>
                            <option value="disabled" disabled>
                                Move to...
                            </option>
                            <option value="currentlyWatching">
                                Currently Watching
                            </option>
                            <option value="wantToWatch">Want to Watch</option>
                            <option value="watched">Watched</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>

                <div>
                    {isEditing ? (
                        <form className="form" onSubmit={handleFormSubmit}>
                            <label className="form-label">
                                Title:
                                <input
                                    className="form-input"
                                    type="text"
                                    name="title"
                                    value={updatedMovie.title}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label className="form-label">
                                <br />
                                Description:
                                <br />
                                <textarea
                                    className="form-textarea"
                                    name="description"
                                    value={updatedMovie.description}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <br />
                            <button type="submit">Save</button> &nbsp;
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </form>
                    ) : (
                        <>
                            <div className="movie-title">{title}</div>
                            <div className="movie-descriptions">
                                {description}&nbsp;
                            </div>
                            <button
                                className="button-delete"
                                onClick={() => handleDelete(id)}
                            >
                                Delete
                            </button>
                            <button
                                className="button-update"
                                onClick={() => setIsEditing(true)}
                            >
                                Update
                            </button>
                        </>
                    )}
                </div>
            </div>
        </li>
    );
};

export default Movie;
