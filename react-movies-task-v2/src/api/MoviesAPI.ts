import { MovieInterface } from "../interfaces/MovieInterface";

const api = "http://localhost:4000";

// Generate a unique token for storing your movie data on the backend server.
let token = localStorage.token;
if (!token) token = localStorage.token = Math.random().toString(36).slice(-8);

const headers = {
    Accept: "application/json",
    Authorization: token,
};

export const getMovie = (movieId: string) =>
    fetch(`${api}/movies/${movieId}`, { headers }).then((res) => res.json());

export const getAllMovies = () =>
    fetch(`${api}/movies`, { headers }).then((res) => res.json());

export const updateMovie = (movie: MovieInterface, shelf: string) =>
    fetch(`${api}/movies/${movie.id}`, {
        method: "PUT",
        headers: {
            ...headers,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({...movie, shelf}),
    }).then((res) => res.json());

export const searchMovies = (query: string) =>
    fetch(`${api}/movies`, { headers })
        .then((res) => res.json())
        .then((movies: MovieInterface[]) =>
             movies.filter((movie) => {
                return (
                    movie.title.includes(query) ||
                    movie.description.includes(query)
                );
            })
        );
