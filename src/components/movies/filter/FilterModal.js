import {useState} from 'react';
import Slider from 'rc-slider';
import Modal from '../../ui/Modal';
import Carousel from '../../ui/Carousel';
import {GENRES} from '../../../constants/constants';

import 'rc-slider/assets/index.css';
import styles from './FilterModal.module.css';

const sliderStyle = {
    style: {paddingTop: '1rem'},
    railStyle: {height: '0.5rem'},
    handleStyle: {
        height: '1.1rem',
        width: '1.1rem',
        border: '2px solid #2b7a77',
        boxShadow: '0 0 5px #2b7a77',
        backgroundColor: '#17242a',
        opacity: 1,
    },
    trackStyle: {
        height: '0.5rem',
        backgroundColor: '#17242a',
    },
};

const FilterModal = ({onClose, setFilters, defaultFilters, likelihood}) => {
    const [liked, setLiked] = useState(likelihood ? defaultFilters.liked : 'Both');
    const [genres, setGenres] = useState(defaultFilters.genres);
    const [yearRange, setYearRange] = useState(defaultFilters.year);
    const [ratingRange, setRatingRange] = useState(defaultFilters.rating);

    const genreClickHandler = (genre) => {
        if (genre === 'All' && !genres.includes('All')) {
            setGenres(['All']);
        } else if (genre !== 'All') {
            setGenres((prevGenres) => {
                if (prevGenres.includes(genre)) {
                    return prevGenres.filter(el => el !== genre && el !== 'All');
                } else {
                    return [...prevGenres, genre].filter(el => el !== 'All');
                }
            });
        }
    };

    return (
        <Modal onClose={onClose}>
            <div className={styles.filterModal}>
                {likelihood && <div className={styles.section}>
                    <h3>Content type</h3>
                    <Carousel items={['Both', 'Liked', 'Disliked'].map((item) => {
                        return (
                            <button className={`${styles.item} ${liked === item && styles.selected}`}
                                    onClick={() => setLiked(item)}>
                                {item}
                            </button>
                        );
                    })}/>
                </div>}
                <div className={styles.section}>
                    <h3>Genres</h3>
                    <Carousel items={['All', ...Object.values(GENRES)].map((item) => {
                        return (
                            <button className={`${styles.item} ${genres.includes(item) && styles.selected}`}
                                    onClick={() => genreClickHandler(item)}>
                                {item}
                            </button>
                        );
                    })}/>
                </div>
                <div className={styles.section}>
                    <div className={styles.rangeValues}>
                        <h3>Year</h3>
                        <span>From {yearRange[0]} to {yearRange[1]}</span>
                    </div>
                    <div className={styles.range}>
                        <Slider
                            range
                            min={1950}
                            max={2022}
                            step={1}
                            allowCross={false}
                            style={sliderStyle.style}
                            railStyle={sliderStyle.railStyle}
                            handleStyle={sliderStyle.handleStyle}
                            trackStyle={sliderStyle.trackStyle}
                            value={yearRange}
                            onChange={value => setYearRange(value)}
                        />
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.rangeValues}>
                        <h3>Rating</h3>
                        <span>From {ratingRange[0].toFixed(1)} to {ratingRange[1].toFixed(1)}</span>
                    </div>
                    <div className={styles.range}>
                        <Slider
                            range
                            min={0.0}
                            max={10.0}
                            step={0.1}
                            allowCross={false}
                            style={sliderStyle.style}
                            railStyle={sliderStyle.railStyle}
                            handleStyle={sliderStyle.handleStyle}
                            trackStyle={sliderStyle.trackStyle}
                            value={ratingRange}
                            onChange={value => setRatingRange(value)}
                        />
                    </div>
                </div>
            </div>
            <div>
                <button className={styles.btn} onClick={() => {
                    const filters = {
                        genres: genres,
                        year: yearRange,
                        rating: ratingRange,
                    };
                    if (likelihood) filters.liked = liked;
                    setFilters(filters);
                    onClose();
                }}>Apply
                </button>
                <button className={`${styles.btn} ${styles.cancel}`} onClick={onClose}>Cancel</button>
            </div>
        </Modal>
    );
};

export default FilterModal;
