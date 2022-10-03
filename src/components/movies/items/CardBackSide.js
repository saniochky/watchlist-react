import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faImdb} from '@fortawesome/free-brands-svg-icons';

import styles from './CardBackSide.module.css';

const CardBackSide = (props) => {
    return (
        !props.loading && <div className={styles.card}>
            <div className={styles.info} onClick={props.flipCard}>
                <p><strong>Year: </strong>{new Date(props.movie.release_date).getFullYear()}</p>
                <p><strong>Genre: </strong>{props.movie.genres.map(el => el.name).join(', ')}</p>
                <p><strong>Budget: </strong>{'$' + props.movie.budget}</p>
                <p><strong>Revenue: </strong>{'$' + props.movie.revenue}</p>
            </div>
            <div
                className={styles.rating}
                onMouseEnter={() => props.changeBacklightCardStyle('YELLOW')}
                onMouseLeave={() => props.changeBacklightCardStyle('ORANGE')}
            >
                <a href={`https://www.imdb.com/title/${props.movie.imdb_id}`} target="_blank" rel="noreferrer"
                   className={styles.link}>
                    <FontAwesomeIcon icon={faImdb} className={styles.imdb}/>
                    <span>{(Math.round(props.movie.vote_average * 10) / 10).toFixed(1)}</span>
                </a>
            </div>
        </div>
    );
};

export default CardBackSide;
