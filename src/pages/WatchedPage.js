import {useState} from 'react';
import MovieFilter from '../components/movies/filter/MovieFilter';
import WatchedMovieList from '../components/movies/WatchedMovieList';
import {FILTERS, SORTING_FUNCTIONS} from '../constants/constants';

const WatchedPage = () => {
    const [sortOption, setSortOption] = useState({value: 'dateDes', label: 'Newest Added'});
    const [filters, setFilters] = useState({
        liked: 'Both',
        genres: ['All'],
        rating: [0.0, 10.0],
        year: [1950, new Date().getFullYear()]
    });

    return (
        <>
            <h1>Watched Page</h1>
            <MovieFilter sortBy={sortOption} setSort={setSortOption} defaultFilters={filters} setFilters={setFilters}/>
            <WatchedMovieList sortBy={SORTING_FUNCTIONS[sortOption.value]}
                              filterLiked={FILTERS.liked(filters.liked)}
                              filterGenres={FILTERS.genres(filters.genres)}
                              filterYear={FILTERS.year(filters.year)}
                              filterRating={FILTERS.rating(filters.rating)}
            />
        </>
    );
};

export default WatchedPage;
