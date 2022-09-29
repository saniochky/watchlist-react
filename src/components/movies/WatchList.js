import {useContext} from 'react';
import {motion} from 'framer-motion';
import List from '../ui/List';
import MovieItem from './items/MovieItem';
import LoadingIndicator from '../ui/LoadingIndicator';
import MoviesContext from '../../store/movies-context';
import {faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons';

const WatchList = () => {
    const moviesCtx = useContext(MoviesContext);

    if (moviesCtx.isLoading) return <LoadingIndicator/>;

    if (moviesCtx.error) return <h2>Oops, something went wrong. Try Again!</h2>;

    let content = <h3>The Watchlist is empty.</h3>;

    if (moviesCtx.watchlistCount > 0) {
        content = (
            <List>
                {moviesCtx.watchlist.map((movie, i) => (
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
                            movieId={movie.id}
                            leftIcon={faThumbsUp}
                            rightIcon={faThumbsDown}
                            leftIconTitle="Like"
                            rightIconTitle="Dislike"
                            leftAction={moviesCtx.likeMovie}
                            rightAction={moviesCtx.dislikeMovie}
                            buttonName="Remove"
                            buttonTitle="Remove movie from Watchlist"
                            buttonHoverColor="red"
                            buttonBacklightHoverColor="RED"
                            buttonClickHandler={moviesCtx.removeMovieFromWatchlist}
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
