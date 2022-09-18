import {useRef, useContext} from 'react';
import List from '../ui/List';
import MovieItem from './items/MovieItem';
import LoadingIndicator from '../ui/LoadingIndicator';
import MoviesContext from '../../store/movies-context';
import {faMagnifyingGlass, faCircleXmark} from '@fortawesome/free-solid-svg-icons';

const WatchedMovieList = () => {
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
                {moviesCtx.watched.map(movie => (
                    <MovieItem
                        key={movie.id}
                        ref={el => itemsRef.current[movie.id] = el}
                        movieId={movie.id}
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
