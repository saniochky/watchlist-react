import {useState} from 'react';
import MovieFilter from '../components/movies/filter/MovieFilter';
import WatchList from '../components/movies/WatchList';
import {FILTERS, SORTING_FUNCTIONS} from '../constants/constants';

const WatchlistPage = () => {
    const [sortOption, setSortOption] = useState({value: 'date', label: 'Addition Date'});
    const [filters, setFilters] = useState({
        genres: ['All'],
        rating: [0.0, 10.0],
        year: [1950, new Date().getFullYear()]
    });

    return (
        <>
            <h1>Watchlist Page</h1>
            <MovieFilter sortBy={sortOption} setSort={setSortOption} defaultFilters={filters}
                         setFilters={setFilters} likelihood={false}/>
            <WatchList sortBy={SORTING_FUNCTIONS[sortOption.value]}
                       filterGenres={FILTERS.genres(filters.genres)}
                       filterYear={FILTERS.year(filters.year)}
                       filterRating={FILTERS.rating(filters.rating)}
            />
        </>
    );
};

export default WatchlistPage;
