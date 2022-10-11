import {useState} from 'react';
import Select from 'react-select';
import FilterModal from './FilterModal';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGears} from '@fortawesome/free-solid-svg-icons';

import styles from './MovieFilter.module.css';

const options = [
    {value: 'dateDes', label: 'Newest Added'},
    {value: 'dateAsc', label: 'Oldest Added'},
    {value: 'title', label: 'Title'},
    {value: 'yearAsc', label: 'Year Ascending'},
    {value: 'yearDes', label: 'Year Descending'},
    {value: 'ratingAsc', label: 'Rating Ascending'},
    {value: 'ratingDes', label: 'Rating Descending'},
];
const selectStyles = {
    control: styles => ({
        ...styles,
        '&:hover': {borderColor: '#f07c41'},
        '&:active': {borderColor: '#f07c41'},
        width: '13rem',
        fontWeight: '600',
        backgroundColor: 'transparent',
        color: '#17242a',
        border: '2px solid #17242a',
        boxShadow: 'none'
    }),
    dropdownIndicator: styles => ({...styles, color: 'inherit', '&:hover': {color: '#f07c41'}}),
    placeholder: styles => ({...styles, color: 'inherit'}),
    indicatorSeparator: styles => ({...styles, display: 'none'}),
    menu: styles => ({...styles, border: '2px solid #17242a', padding: '0'}),
    option: (styles, {isFocused}) => ({
        ...styles,
        color: '#17242a',
        fontWeight: '600',
        backgroundColor: isFocused && '#f07c41'
    }),
};

const MovieFilter = ({sortBy, setSort, defaultFilters, setFilters, likelihood = true}) => {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className={styles.filter}>
            <div className={styles.sortby}>
                <label>Sort by</label>
                <Select options={options} defaultValue={sortBy} isSearchable={false}
                        styles={selectStyles} onChange={setSort}/>
            </div>
            <div className={styles.filterby}>
                <button onClick={() => setShowFilters(true)}>Filter <FontAwesomeIcon icon={faGears}/></button>
                {showFilters && <FilterModal likelihood={likelihood} defaultFilters={defaultFilters}
                                             setFilters={setFilters} onClose={() => setShowFilters(false)}
                />}
            </div>
        </div>
    );
};

export default MovieFilter;
