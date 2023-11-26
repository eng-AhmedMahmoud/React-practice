import MovieShelf from "./MovieShelf";
import { Link } from "react-router-dom";
import { MovieInterface } from "../interfaces/MovieInterface";

interface MovieListProps {
    movies: MovieInterface[];
    onChange: (movie: MovieInterface, shelf: string) => void;
}

const MoviesList = (props: MovieListProps) => {
    const { movies, onChange } = props;
    console.log(movies)
    return (
        <div className="list-movies">
            <div className="list-movies-title">
                <h1>MyMovies</h1>
            </div>
            <div className="list-movies-content">
                <div>
                    <MovieShelf
                        movies={
                            movies?.filter(
                                (movie) => movie.shelf === "currentlyWatching"
                            ) ?? []
                        }
                        title="Currently Watching"
                        handleChange={onChange}
                    />

                    <MovieShelf
                        movies={
                            movies?.filter(
                                (movie) => movie.shelf === "watched"
                            ) ?? []
                        }
                        title="Watched"
                        handleChange={onChange}
                    />

                    <MovieShelf
                        movies={
                            movies?.filter(
                                (movie) => movie.shelf === "wantToWatch"
                            ) ?? []
                        }
                        title="Want to watch"
                        handleChange={onChange}
                    />
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">
                    <button>Add a movie</button>
                </Link>
            </div>
        </div>
    );
};

export default MoviesList;
