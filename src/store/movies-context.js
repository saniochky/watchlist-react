import {createContext, useContext, useEffect, useState} from 'react';
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

    const getMovieById = async (movieId) => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=f42aecfe4bb38f5459141677e82f1941`);
        return await response.json();
    };

    useEffect(() => {
        const getMovies = async () => {
            const response = await fetch('https://movie-watchlister-api.herokuapp.com/api/movies/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            });
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            const watchlist = await Promise.all(data.watchlist.map(async movie => {
                return {...await getMovieById(movie.id), addedDate: movie.addedDate};
            }));
            const watched = await Promise.all(data.watched.map(async movie => {
                return {...await getMovieById(movie.id), addedDate: movie.addedDate, liked: movie.liked};
            }));
            return {watchlist, watched};
        };

        if (authCtx.isLoggedIn) {
            setIsLoading(true);
            try {
                getMovies().then(data => {
                    setWatchlist(data.watchlist);
                    setWatched(data.watched);
                    setIsLoading(false);
                });
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
                if (error === 'Invalid token') {
                    authCtx.logout();
                }
                console.log(error);
                return 'error';
            }
        }
    }, [authCtx]);

    const addMovieToWatchlistHandler = (movieData) => {
        if (!watchlist.some(movie => movie.id === movieData.id)) {
            getMovieById(movieData.id).then(movie => {
                setWatchlist(prevWatchlist => [...prevWatchlist, {...movie, ...movieData}]);
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
                }).catch(error => {
                    console.log(error);
                    return 'error';
                });
            });
        }
    };

    const addMovieToWatchedHandler = (movieData) => {
        if (!watched.some(movie => movie.id === movieData.id)) {
            getMovieById(movieData.id).then(movie => {
                setWatched(prevWatched => [...prevWatched, {...movie, ...movieData}]);
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
                    removeMovieFromWatchlistHandler(movieData);
                }).catch(error => {
                    console.log(error);
                    return 'error';
                });
            });
        }
    };

    const likeMovieHandler = (movieData) => {
        addMovieToWatchedHandler({id: movieData.id, addedDate: new Date().toISOString(), liked: true});
    };

    const dislikeMovieHandler = (movieData) => {
        addMovieToWatchedHandler({id: movieData.id, addedDate: new Date().toISOString(), liked: false});
    };

    const removeMovieFromWatchlistHandler = (movieData) => {
        if (watchlist.some(movie => movie.id === movieData.id)) {
            setWatchlist((prevWatchlist) => prevWatchlist.filter(movie => movie.id !== movieData.id));
            fetch('https://movie-watchlister-api.herokuapp.com/api/movies/watchlist/remove', {
                method: 'PATCH',
                body: JSON.stringify({id: movieData.id}),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            }).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
            }).catch(error => {
                console.log(error);
                return 'error';
            });
        }
    };

    const removeMovieFromWatchedHandler = (movieData) => {
        if (watched.some(movie => movie.id === movieData.id)) {
            setWatched((prevWatched) => prevWatched.filter(movie => movie.id !== movieData.id));
            fetch('https://movie-watchlister-api.herokuapp.com/api/movies/watched/remove', {
                method: 'PATCH',
                body: JSON.stringify({id: movieData.id}),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            }).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
                addMovieToWatchlistHandler({id: movieData.id, addedDate: new Date().toISOString()});
            }).catch(error => {
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
