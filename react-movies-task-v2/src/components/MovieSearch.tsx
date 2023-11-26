import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Movie from "./Movie";
import * as MoviesAPI from "../api/MoviesAPI";
import { MovieInterface } from "../interfaces/MovieInterface";

interface MovieSearchProps {
    onChange: (movie: MovieInterface, shelf: string) => void;
    searchableMovies: MovieInterface[];
}

const MovieSearch: React.FC<MovieSearchProps> = ({
    onChange,
    searchableMovies,
}) => {
    const [movies, setMovies] = useState<MovieInterface[]>(searchableMovies);
    const [query, setQuery] = useState<string>("");
    const changeMovieShelf = (movies: MovieInterface[]): MovieInterface[] => {
        let myMovies = searchableMovies;
        for (let movie of movies) {
            movie.shelf = "none";
        }
    
        for (let movie of movies) {
            for (let m of myMovies) {
                if (m.id === movie.id) {
                    movie.shelf = m.shelf;
                }
            }
        }
        return movies;
    };

    useEffect(() => {
        if (query.length !== 0) {
            MoviesAPI.searchMovies(query).then((movies: MovieInterface[]) => {
                if (movies.length > 0) {
                    movies = changeMovieShelf(movies);
                    setMovies(movies);
                }
            });
        } else {
            setMovies([]);
            setQuery("");
        }
    }, [query]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let val = event.target.value;
        setQuery(val);
    };


    const addMovie = (movie: MovieInterface, shelf: string) => {
        onChange(movie, shelf);
    };

    return (
        <div className="search-movies">
            <div className="search-movies-bar">
                <Link to="/" className="close-search">
                    Close
                </Link>
                <div className="search-movies-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title or description"
                        value={query}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="search-movies-results">
                <ol className="movies-grid">
                    {query.length > 0 &&
                        movies.map((movie, index) => (
                            <Movie
                                movie={movie}
                                key={index}
                                onUpdate={(id, shelf) => {
                                    addMovie(id, shelf);
                                }}
                                setMoviesData={setMovies}
                            />
                        ))}
                </ol>
            </div>
        </div>
    );
};

export default MovieSearch;