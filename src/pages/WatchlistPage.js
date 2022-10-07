import {useState} from 'react';
import MovieFilter from '../components/movies/filter/MovieFilter';
import WatchList from '../components/movies/WatchList';

const sortingFunctions = {
    date: (a, b) => new Date(a.addedDate) - new Date(b.addedDate),
    title: (a, b) => a.title.localeCompare(b.title),
    yearAsc: (a, b) => new Date(a.release_date) - new Date(b.release_date),
    yearDes: (a, b) => new Date(b.release_date) - new Date(a.release_date),
    ratingAsc: (a, b) => a.rating - b.rating,
    ratingDes: (a, b) => b.rating - a.rating,
};

const WatchlistPage = () => {
    const [sortOption, setSortOption] = useState({value: 'date', label: 'Addition Date'});
    const [filters, setFilters] = useState({liked: 'Both', genres: [], rating: [], year: []});

    return (
        <>
            <h1>Watchlist Page</h1>
            <MovieFilter sortBy={sortOption} setSort={setSortOption} setFilters={setFilters}/>
            {/*sortingFunctions[sortOption.value]*/}
            <WatchList sortBy={sortingFunctions.date}/>
        </>
    );
};

export default WatchlistPage;
