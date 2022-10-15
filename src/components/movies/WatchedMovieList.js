import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {motion} from 'framer-motion';
import MovieItem from './items/MovieItem';
import List from '../ui/List';
import LoadingIndicator from '../ui/LoadingIndicator';
import {removeMovieFromWatched} from '../../store/redux-store';
import {faMagnifyingGlass, faCircleXmark, faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons';

const WatchedMovieList = (props) => {
    const [key, setKey] = useState(Math.random());
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

    useEffect(() => {
        setKey(Math.random());
    }, [props]);

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
