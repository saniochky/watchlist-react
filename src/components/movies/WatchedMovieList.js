import {useRef, useContext} from 'react';
import {motion} from 'framer-motion';
import List from '../ui/List';
import MovieItem from './items/MovieItem';
import LoadingIndicator from '../ui/LoadingIndicator';
import MoviesContext from '../../store/movies-context';
import {faMagnifyingGlass, faCircleXmark} from '@fortawesome/free-solid-svg-icons';

const WatchedMovieList = (props) => {
    const moviesCtx = useContext(MoviesContext);
    const itemsRef = useRef({});

    const flipUpCardsHandler = () => {
        for (const itemId in itemsRef.current) {
            itemsRef.current[itemId].flipUpCard();
        }
    };

    if (moviesCtx.isLoading) return <LoadingIndicator/>;

    if (moviesCtx.error) return <h2>Oops, something went wrong. Try Again!</h2>;

    let content = <h3>The Watched List is empty.</h3>;

    if (moviesCtx.watchedCount > 0) {
        content = (
            <List>
                {moviesCtx.watched.sort(props.sortBy)
                    .filter(props.filterLiked)
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
                            key={movie.id}
                            ref={el => itemsRef.current[movie.id] = el}
                            movie={movie}
                            flippable
                            flipUpCards={flipUpCardsHandler}
                            leftIcon={faMagnifyingGlass}
                            rightIcon={faCircleXmark}
                            leftIconTitle="View details"
                            rightIconTitle="Remove movie from the Watched"
                            rightAction={moviesCtx.removeMovieFromWatched}
                            buttonName="Watch"
                            buttonTitle={"Rewatch movie"}
                            buttonClickHandler={() => window.open('https://rezka.ag/', '_blank', 'noopener,noreferrer')}
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
