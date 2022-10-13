import {configureStore, createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const fetchMovieByIdAsync = async (movieId) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=f42aecfe4bb38f5459141677e82f1941`);

    if (!response.ok) {
        throw new Error('Something went wrong!');
    }

    return await response.json();
};

const fetchMoviesAsync = async () => {
    const response = await fetch('https://movie-watchlister-api.herokuapp.com/api/movies/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
    }

    return await response.json();
};

const addMovieToWatchlistAsync = async (movieData) => {
    const response = await fetch('https://movie-watchlister-api.herokuapp.com/api/movies/watchlist/add', {
        method: 'PATCH',
        body: JSON.stringify(movieData),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    });

    if (!response.ok) {
        throw new Error('Something went wrong!');
    }

    return await response.json();
};

const addMovieToWatchedAsync = async (movieData) => {
    const response = await fetch('https://movie-watchlister-api.herokuapp.com/api/movies/watched/add', {
        method: 'PATCH',
        body: JSON.stringify(movieData),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    });

    if (!response.ok) {
        throw new Error('Something went wrong!');
    }

    return await response.json();
};

const removeMovieFromWatchlistAsync = async (movieId) => {
    const response = await fetch('https://movie-watchlister-api.herokuapp.com/api/movies/watchlist/remove', {
        method: 'PATCH',
        body: JSON.stringify({id: movieId}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    });

    if (!response.ok) {
        throw new Error('Something went wrong!');
    }

    return await response.json();
};

const removeMovieFromWatchedAsync = async (movieId) => {
    const response = await fetch('https://movie-watchlister-api.herokuapp.com/api/movies/watched/remove', {
        method: 'PATCH',
        body: JSON.stringify({id: movieId}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    });

    if (!response.ok) {
        throw new Error('Something went wrong!');
    }

    return await response.json();
};

const fetchMovies = createAsyncThunk('movies/fetchMovies', async (userData, {rejectWithValue}) => {
    let data;

    try {
        data = await fetchMoviesAsync();
    } catch (error) {
        return rejectWithValue(error.message);
    }

    const watchlist = await Promise.all(data.watchlist.map(async movie => {
        return {...await fetchMovieByIdAsync(movie.id), addedDate: movie.addedDate};
    }));
    const watched = await Promise.all(data.watched.map(async movie => {
        return {...await fetchMovieByIdAsync(movie.id), addedDate: movie.addedDate, liked: movie.liked};
    }));

    return {watchlist, watched};
});

const addMovieToWatchlist = createAsyncThunk('movies/addMovieToWatchlist', async (movieData) => {
    console.log(await addMovieToWatchlistAsync(movieData));
    console.log(await removeMovieFromWatchedAsync(movieData.id));
    const movie = await fetchMovieByIdAsync(movieData.id);
    movie.addedDate = movieData.addedDate;
    return movie;
});

const addMovieToWatched = createAsyncThunk('movies/addMovieToWatched', async (movieData) => {
    console.log(await addMovieToWatchedAsync(movieData));
    console.log(await removeMovieFromWatchlistAsync(movieData.id));
    const movie = await fetchMovieByIdAsync(movieData.id);
    movie.addedDate = movieData.addedDate;
    movie.liked = movieData.liked;
    return movie;
});

const removeMovieFromWatchlist = createAsyncThunk('movies/removeMovieFromWatchlist', async (movieData) => {
    console.log(await removeMovieFromWatchlistAsync(movieData.id));
    return movieData.id;
});

const removeMovieFromWatched = createAsyncThunk('movies/removeMovieFromWatched', async (movieData) => {
    console.log(await removeMovieFromWatchedAsync(movieData.id));
    console.log(await addMovieToWatchlistAsync({id: movieData.id, addedDate: new Date().toISOString()}));
    return movieData.id;
});

const initialState = {
    watchlist: [],
    watched: [],
    isLoading: false,
    error: null,
};

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state, action) => {
                if (!state.isLoading) {
                    state.isLoading = true
                    state.error = null;
                }
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.watchlist = action.payload.watchlist;
                state.watched = action.payload.watched;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addMovieToWatchlist.pending, (state, action) => {
                state.watched = state.watched.filter(movie => movie.id !== action.meta.arg.id);
            })
            .addCase(addMovieToWatchlist.fulfilled, (state, action) => {
                if (!state.watchlist.some(movie => movie.id === action.payload.id)) {
                    state.watchlist.push(action.payload);
                }
            })
            .addCase(addMovieToWatched.pending, (state, action) => {
                state.watchlist = state.watchlist.filter(movie => movie.id !== action.meta.arg.id);
            })
            .addCase(addMovieToWatched.fulfilled, (state, action) => {
                if (!state.watched.some(movie => movie.id === action.payload.id)) {
                    state.watched.push(action.payload);
                }
            })
            .addCase(removeMovieFromWatchlist.pending, (state, action) => {
                state.watchlist = state.watchlist.filter(movie => movie.id !== action.meta.arg.id);
            })
            .addCase(removeMovieFromWatched.pending, (state, action) => {
                state.watched = state.watched.filter(movie => movie.id !== action.meta.arg.id);
            })
            .addCase(removeMovieFromWatched.fulfilled, (state, action) => {
                if (!state.watchlist.some(movie => movie.id === action.payload)) {
                    state.watchlist.push({id: action.payload, addedDate: new Date().toISOString()});
                }
            });
    },
});

const store = configureStore({
    reducer: movieSlice.reducer,
});

export {fetchMovies, addMovieToWatchlist, removeMovieFromWatchlist, addMovieToWatched, removeMovieFromWatched};

export default store;
