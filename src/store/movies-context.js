import {createContext, useState, useEffect} from 'react';

const MoviesContext = createContext({
    watchlist: [],
    watched: [],
    watchlistCount: 0,
    watchedCount: 0,
    addMovieToWatchlist: (movieData) => {
    },
    addMovieToWatched: (movieData) => {
    },
    likeMovie: (movieId) => {},
    dislikeMovie: (movieId) => {},
    removeMovieFromWatchlist: (movieId) => {
    },
    removeMovieFromWatched: (movieId) => {
    },
    isLoading: false,
    error: null,
});

export const MoviesContextProvider = (props) => {
    const [watchlist, setWatchlist] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        // setWatched([1, 2, 3, 4, 5, 6]);
        // setWatchlist([7, 8, 9, 10, 11, 12]);
        setIsLoading(false);
        setError(false);
    }, []);

    const addMovieToWatchlistHandler = (movieData) => {
        if (!watchlist.some(movie => movie.id === movieData.id)) {
            setWatchlist((prevWatchlist) => [...prevWatchlist, movieData]);
        }
    };

    const addMovieToWatchedHandler = (movieData) => {
        if (!watched.some(movie => movie.id === movieData.id)) {
            setWatched((prevWatched) => [...prevWatched, movieData]);
            removeMovieFromWatchlistHandler(movieData.id);
        }
    };

    const likeMovieHandler = (movieId) => {
        addMovieToWatchedHandler({id: movieId, addedDate: Date.now(), liked: true});
    };

    const dislikeMovieHandler = (movieId) => {
        addMovieToWatchedHandler({id: movieId, addedDate: Date.now(), liked: false});
    };

    const removeMovieFromWatchlistHandler = (movieId) => {
        setWatchlist((prevWatchlist) => prevWatchlist.filter(movie => movie.id !== movieId));
    };

    const removeMovieFromWatchedHandler = (movieId) => {
        if (watched.some(movie => movie.id === movieId)) {
            setWatched((prevWatched) => prevWatched.filter(movie => movie.id !== movieId));
            addMovieToWatchlistHandler({id: movieId, addedDate: Date.now()});
        }
    };

    const context = {
        watchlist: watchlist,
        watched: watched,
        watchlistCount: watchlist.length,
        watchedCount: watched.length,
        addMovieToWatchlist: addMovieToWatchlistHandler,
        addMovieToWatched: addMovieToWatchedHandler,
        likeMovie: likeMovieHandler,
        dislikeMovie: dislikeMovieHandler,
        removeMovieFromWatchlist: removeMovieFromWatchlistHandler,
        removeMovieFromWatched: removeMovieFromWatchedHandler,
        isLoading,
        error,
    };

    return (
        <MoviesContext.Provider value={context}>
            {props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesContext;
