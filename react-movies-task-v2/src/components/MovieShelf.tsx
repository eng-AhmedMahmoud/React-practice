import { useState } from "react";
import Movie from "./Movie";
import { MovieInterface } from "../interfaces/MovieInterface";

interface MovieShelfProps {
    movies: MovieInterface[];
    title: string;
    handleChange: (movie: MovieInterface, shelf: string) => void;
}

const MovieShelf: React.FC<MovieShelfProps> = (props) => {
    const { movies, title, handleChange } = props;
    const [moviesData, setMoviesData] = useState<MovieInterface[]>(movies);

    return (
        <div className="movie-shelf">
            <h2 className="movie-shelf-title">{title}</h2>
            <div className="movie-shelf-movies">
                <ol className="movies-grid">
                    {moviesData.map((movie, index) => (
                        <Movie
                            movie={movie}
                            key={index}
                            onUpdate={handleChange}
                            setMoviesData={setMoviesData}
                        />
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default MovieShelf;
