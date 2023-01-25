import {useState, useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {motion, AnimatePresence} from 'framer-motion';
import useHttp from '../../hooks/use-http';
import RecommendedMovie from './items/RecommendedMovie';
import LoadingIndicator from '../ui/LoadingIndicator';

import {SORTING_VALUES as sorting} from '../../constants/constants';

const Recommendation = () => {
    const watchlist = useSelector(state => state.watchlist);
    const watched = useSelector(state => state.watched);
    const [movie, setMovie] = useState(null);
    const {isLoading, error, sendRequest} = useHttp();

    const fetchMovie = useCallback(() => {
        setMovie(null);
        sendRequest({url: `https://api.themoviedb.org/3/discover/movie?api_key=f42aecfe4bb38f5459141677e82f1941&language=en-US&sort_by=${sorting[Math.floor(Math.random() * sorting.length)]}&include_adult=${Math.random() > 0.5}&include_video=false&page=${Math.ceil(Math.random() * 5)}&year=${Math.floor(Math.random() * 40) + 1983}&vote_count.gte=2000&vote_average.gte=0.4`},
            (data) => {
                const unseenMovies = data.results.filter(movie => !watchlist.some(watchlistMovie => watchlistMovie.id === movie.id) && !watched.some(watchedMovie => watchedMovie.id === movie.id));
                if (unseenMovies.length > 0) {
                    const chosenMovie = unseenMovies[Math.floor(Math.random() * unseenMovies.length)];
                    chosenMovie.poster = `https://image.tmdb.org/t/p/w500${chosenMovie.poster_path}`;
                    setMovie(chosenMovie);
                } else {
                    fetchMovie();
                }
            });
    }, [sendRequest, watchlist, watched]);

    useEffect(() => {
        fetchMovie();
    }, []);

    if (error) return <h2>Oops, something went wrong. Try Again!</h2>;

    return (
        <AnimatePresence mode="wait">
            {!movie || isLoading ? <LoadingIndicator/> : <motion.div
                key={movie.id}
                initial={{x: "-20rem", opacity: 0, scale: 0.5}}
                animate={{x: 0, opacity: 1, scale: 1, transition: {duration: 0.5}}}
                exit={{x: "20rem", opacity: 0, transition: {duration: 0.5}}}
            >
                <RecommendedMovie movie={movie} fetchMovie={fetchMovie}/>
            </motion.div>}
        </AnimatePresence>
    );
};

export default Recommendation;
