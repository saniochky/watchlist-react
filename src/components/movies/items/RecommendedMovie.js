import {useContext} from 'react';
import {motion} from 'framer-motion';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClapperboard, faPlus, faThumbsDown, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import moviesContext from '../../../store/movies-context';

import {GENRES} from '../../../constants/constants';
import styles from './RecommendedMovie.module.css';

const RecommendedMovie = ({movie, fetchMovie}) => {
    const moviesCtx = useContext(moviesContext);

    return (
        <div className={styles.recommendations}>
            <div>
                <img src={movie.poster} alt={movie.title} className={styles.poster}/>
                <button className={styles.next} onClick={fetchMovie}>Next</button>
            </div>
            <div className={styles.info}>
                <h2>{movie.title} ({new Date(movie.release_date).getFullYear()})</h2>
                <p>{movie.release_date.replaceAll('-', '/')} • {movie.genre_ids.map(genre_id => GENRES[genre_id]).join(', ')}</p>
                <div className={styles.controls}>
                    <motion.button
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                        transition={{type: "spring", stiffness: 200, damping: 10}}
                        title="Like"
                        className={styles.like}
                        onClick={() => {
                            moviesCtx.likeMovie(movie.id);
                            fetchMovie();
                        }}
                    >
                        <FontAwesomeIcon icon={faThumbsUp} className={styles.icon}/>
                    </motion.button>
                    <motion.button
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                        transition={{type: "spring", stiffness: 200, damping: 10}}
                        title="Add to Watchlist"
                        className={styles.add}
                        onClick={() => {
                            moviesCtx.addMovieToWatchlist({
                                id: movie.id,
                                addedDate: new Date().toISOString(),
                            });
                            fetchMovie()
                        }}>
                        <FontAwesomeIcon icon={faPlus} className={styles.icon}/>
                        <FontAwesomeIcon icon={faClapperboard} className={styles.icon}/>
                    </motion.button>
                    <motion.button
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                        transition={{type: "spring", stiffness: 200, damping: 10}}
                        title="Dislike"
                        className={styles.dislike}
                        onClick={() => {
                            moviesCtx.dislikeMovie(movie.id);
                            fetchMovie();
                        }}
                    >
                        <FontAwesomeIcon icon={faThumbsDown} className={styles.icon}/>
                    </motion.button>
                </div>
                <h3>Overview</h3>
                <p>{movie.overview}</p>
            </div>
        </div>
    );
};

export default RecommendedMovie;
