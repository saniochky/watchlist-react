import {useState, useEffect, useRef} from 'react';
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
    const isLoading = useSelector(state => state.isLoading);
    const error = useSelector(state => state.error);
    const itemsRef = useRef({});
    const [key, setKey] = useState(Math.random());
    const [sortedMovies, setSortedMovies] = useState([...watchlist].sort(props.sortBy)
        .filter(props.filterGenres)
        .filter(props.filterYear)
        .filter(props.filterRating));

    useEffect(() => {
        setKey(Math.random());
    }, [props]);

    useEffect(() => {
        setSortedMovies([...watchlist].sort(props.sortBy)
            .filter(props.filterGenres)
            .filter(props.filterYear)
            .filter(props.filterRating));
    }, [watchlist, props]);

    if (isLoading) return <LoadingIndicator/>;

    if (error) return <h2 style={{color: 'darkred', padding: '1 rem 2rem'}}>Oops, something went wrong. Try Again!</h2>;

    if (watchlist.length === 0) return <h3 style={{color: 'darkred', padding: '1 rem 2rem'}}>The Watchlist is
        empty.</h3>;

    if (sortedMovies.length === 0) return <h3 style={{color: 'darkred', padding: '1rem 2rem'}}>No movies match your
        filter criteria.</h3>;

    return (
        <List>
            {sortedMovies.map((movie, i) => (
                <motion.div
                    key={movie.id + key}
                    variants={{
                        hidden: {opacity: 0, y: 50},
                        visible: (i) => ({
                            opacity: 1,
                            y: 0,
                            transition: {
                                delay: (i - Object.values(itemsRef.current).filter(el => el?.itemInView).length) * 0.075,
                            }
                        }),
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, margin: "0px 0px -8% 0px"}}
                    custom={i}
                >
                    <MovieItem
                        ref={el => itemsRef.current[movie.id] = el}
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
};

export default WatchList;
