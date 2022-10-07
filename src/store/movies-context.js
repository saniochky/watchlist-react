import {createContext, useState, useEffect, useContext} from 'react';
import AuthContext from './auth-context';

const MoviesContext = createContext({
    watchlist: [],
    watched: [],
    watchlistCount: 0,
    watchedCount: 0,
    addMovieToWatchlist: (movieData) => {
    },
    addMovieToWatched: (movieData) => {
    },
    likeMovie: (movieId) => {
    },
    dislikeMovie: (movieId) => {
    },
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
    const [error, setError] = useState(null);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        if (authCtx.isLoggedIn) {
            setIsLoading(true);
            fetch('https://movie-watchlister-api.herokuapp.com/api/movies/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            }).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then(data => {
                        console.log(data);
                        throw new Error(data.message);
                    });
                }
            }).then(data => {
                setIsLoading(false);
                setWatchlist(data.watchlist);
                setWatched(data.watched);
            }).catch(error => {
                setIsLoading(false);
                if (error.message === 'Invalid token') {
                    authCtx.logout();
                }
                setError(error.message);
                return 'error';
            });
        }
    }, [authCtx, authCtx.isLoggedIn, authCtx.logout]);

    const addMovieToWatchlistHandler = (movieData) => {
        if (!watchlist.some(movie => movie.id === movieData.id)) {
            setWatchlist((prevWatchlist) => [...prevWatchlist, movieData]);
            fetch('https://movie-watchlister-api.herokuapp.com/api/movies/watchlist/add', {
                method: 'PATCH',
                body: JSON.stringify(movieData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            }).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
            }).then(error => {
                console.log(error);
                return 'error';
            });
        }
    };

    const addMovieToWatchedHandler = (movieData) => {
        if (!watched.some(movie => movie.id === movieData.id)) {
            setWatched((prevWatched) => [...prevWatched, movieData]);
            fetch('https://movie-watchlister-api.herokuapp.com/api/movies/watched/add', {
                method: 'PATCH',
                body: JSON.stringify(movieData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            }).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
                removeMovieFromWatchlistHandler(movieData.id);
            }).then(error => {
                console.log(error);
                return 'error';
            });
        }
    };

    const likeMovieHandler = (movieId) => {
        addMovieToWatchedHandler({id: movieId, addedDate: new Date().toISOString(), liked: true});
    };

    const dislikeMovieHandler = (movieId) => {
        addMovieToWatchedHandler({id: movieId, addedDate: new Date().toISOString(), liked: false});
    };

    const removeMovieFromWatchlistHandler = (movieId) => {
        if (watchlist.some(movie => movie.id === movieId)) {
            setWatchlist((prevWatchlist) => prevWatchlist.filter(movie => movie.id !== movieId));
            fetch('https://movie-watchlister-api.herokuapp.com/api/movies/watchlist/remove', {
                method: 'PATCH',
                body: JSON.stringify({id: movieId}),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            }).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
            }).then(error => {
                console.log(error);
                return 'error';
            });
        }
    };

    const removeMovieFromWatchedHandler = (movieId) => {
        if (watched.some(movie => movie.id === movieId)) {
            setWatched((prevWatched) => prevWatched.filter(movie => movie.id !== movieId));
            fetch('https://movie-watchlister-api.herokuapp.com/api/movies/watched/remove', {
                method: 'PATCH',
                body: JSON.stringify({id: movieId}),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            }).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
                addMovieToWatchlistHandler({id: movieId, addedDate: new Date().toISOString()});
            }).then(error => {
                console.log(error);
                return 'error';
            });
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
