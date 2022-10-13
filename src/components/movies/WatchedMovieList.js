import {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {motion} from 'framer-motion';
import MovieItem from './items/MovieItem';
import List from '../ui/List';
import LoadingIndicator from '../ui/LoadingIndicator';
import {removeMovieFromWatched} from '../../store/redux-store';
import {faMagnifyingGlass, faCircleXmark, faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons';

const WatchedMovieList = (props) => {
    const itemsRef = useRef({});
    const dispatch = useDispatch();
    const watched = useSelector(state => state.watched);
    const watchedCount = watched.length;
    const isLoading = useSelector(state => state.isLoading);
    const error = useSelector(state => state.error);

    const sortedMovies = [...watched].sort(props.sortBy)
        .filter(props.filterLiked)
        .filter(props.filterGenres)
        .filter(props.filterYear)
        .filter(props.filterRating);

    const flipUpCardsHandler = () => {
        for (const itemId in itemsRef.current) {
            if (sortedMovies.some(item => item.id.toString() === itemId)) {
                itemsRef.current[itemId].flipUpCard();
            }
        }
    };

    if (isLoading) return <LoadingIndicator/>;

    if (error) return <h2>Oops, something went wrong. Try Again!</h2>;

    let content = <h3>The Watched List is empty.</h3>;

    if (watchedCount > 0) {
        content = (
            <List>
                {sortedMovies.map((movie, i) => (
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
                            key={movie.id}
                            ref={el => itemsRef.current[movie.id] = el}
                            movie={movie}
                            flippable
                            flipUpCards={flipUpCardsHandler}
                            leftIcon={faMagnifyingGlass}
                            rightIcon={faCircleXmark}
                            leftIconTitle="View details"
                            rightIconTitle="Remove movie from the Watched"
                            rightAction={movieData => dispatch(removeMovieFromWatched(movieData))}
                            buttonName="Watch"
                            buttonTitle={"Rewatch movie"}
                            buttonClickHandler={() => window.open('https://rezka.ag/', '_blank', 'noopener,noreferrer')}
                            badge={movie.liked ? faThumbsUp : faThumbsDown}
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

export default WatchedMovieList;
