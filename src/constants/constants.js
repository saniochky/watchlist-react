const API = 'https://web-production-e778.up.railway.app/api/';
const GENRES = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
};

const SORTING_VALUES = [
    'popularity.asc',
    'popularity.desc',
    'release_date.asc',
    'release_date.desc',
    'revenue.asc',
    'revenue.desc',
    'primary_release_date.asc',
    'primary_release_date.desc',
    'original_title.asc',
    'original_title.desc',
    'vote_average.asc',
    'vote_average.desc',
    'vote_count.asc',
    'vote_count.desc',
];

const SORTING_FUNCTIONS = {
    dateAsc: (a, b) => new Date(a.addedDate) - new Date(b.addedDate),
    dateDes: (a, b) => new Date(b.addedDate) - new Date(a.addedDate),
    title: (a, b) => a.title.localeCompare(b.title),
    yearAsc: (a, b) => new Date(a.release_date) - new Date(b.release_date),
    yearDes: (a, b) => new Date(b.release_date) - new Date(a.release_date),
    ratingAsc: (a, b) => a.vote_average - b.vote_average,
    ratingDes: (a, b) => b.vote_average - a.vote_average,
};

const FILTERS = {
    liked: (value) => {
        if (value === 'Both') {
            return () => true;
        } else if (value === 'Liked') {
            return (movie) => movie.liked;
        } else {
            return (movie) => !movie.liked;
        }
    },
    genres: (value) => {
        if (value.includes('All')) {
            return () => true;
        } else {
            return (movie) => movie.genres.map(obj => obj.name).filter(genre => value.includes(genre)).length > 0;
        }
    },
    year: (value) => {
        return (movie) => {
            const year = new Date(movie.release_date).getFullYear();
            return value[0] <= year && year <= value[1];
        };
    },
    rating: (value) => {
        return (movie) => {
            return value[0] <= movie.vote_average && movie.vote_average <= value[1];
        };
    },
};

export {API, GENRES, SORTING_VALUES, SORTING_FUNCTIONS, FILTERS};
