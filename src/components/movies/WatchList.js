import {useDispatch, useSelector} from 'react-redux';
import {motion} from 'framer-motion';
import MovieItem from './items/MovieItem';
import List from '../ui/List';
import LoadingIndicator from '../ui/LoadingIndicator';
import {addMovieToWatched, removeMovieFromWatchlist} from '../../store/redux-store';
import {faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons';

const WatchList = (props) => {
    const dispatch = useDispatch();
    const watchlist = useSelector(state => state.watchlist);
    const watchlistCount = watchlist.length;
    const isLoading = useSelector(state => state.isLoading);
    const error = useSelector(state => state.error);

    if (isLoading) return <LoadingIndicator/>;

    if (error) return <h2>Oops, something went wrong. Try Again!</h2>;

    let content = <h3>The Watchlist is empty.</h3>;

    if (watchlistCount > 0) {
        const movies = [...watchlist];
        content = (
            <List>
                {movies.sort(props.sortBy)
                    .filter(props.filterGenres)
                    .filter(props.filterYear)
                    .filter(props.filterRating)
                    .map((movie, i) => (
                        <motion.div
                            key={movie.id}
                            variants={{
                                hidden: {opacity: 0, y: 50},
                                visible: (i) => ({
                                    opacity: 1,
                                    y: 0,
                                    transition: {delay: i * 0.1}
                                }),
                            }}
                            initial="hidden"
                            animate="visible"
                            custom={i}
                        >
                            <MovieItem
                                movie={movie}
                                leftIcon={faThumbsUp}
                                rightIcon={faThumbsDown}
                                leftIconTitle="Like"
                                rightIconTitle="Dislike"
                                leftAction={movieData => dispatch(addMovieToWatched({
                                    id: movieData.id,
                                    addedDate: new Date().toISOString(),
                                    liked: true
                                }))}
                                rightAction={movieData => dispatch(addMovieToWatched({
                                    id: movieData.id,
                                    addedDate: new Date().toISOString(),
                                    liked: false
                                }))}
                                buttonName="Remove"
                                buttonTitle="Remove movie from Watchlist"
                                buttonHoverColor="red"
                                buttonBacklightHoverColor="RED"
                                buttonClickHandler={movieData => dispatch(removeMovieFromWatchlist(movieData))}
                            />
                        </motion.div>
                    ))}
            </List>
        );
    }

    return (
        <section>
            {content}
        </section>
    );
};

export default WatchList;
