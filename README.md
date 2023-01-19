# [Watchlist React app](https://movie-watchlister.netlify.app/)

**Watchlist React app is my Pet-project demonstrating my FrontEnd (React) skills and knowledge.**

**The primary purpose of this application is to help users organize information about the movies, in particular, find new movies, save the ones they want to watch, and rate the films they have already seen.**

**This project is developed and hosted for demonstration purposes only.**

## Implemented technologies

### Hooks

Hooks that I've used in this project:

- useState
- useEffect
- useRef
- useReducer
- useCallback
- useContext
- useImperativeHandle

### Custom Hooks

I have also written a custom hook **useHttp**, which helps load and transform data via API, and **useInput**, which helps dealing with input values and its validation.

## External libraries

### react-router-dom

Was used to implement routing in the app.

### react-redux

Was used to store cross-component movies state.

### @reduxjs/toolkit

Was used to simplify work with redux.

### react-select

Was used to create flexible select input control for movies sorting.

### rc-slider

Was used to create sliders in movie filter.

### framer-motion

Was used to add animations across the app.

### @fortawesome/react-fontawesome

Was used to add svgs across the app.

### react-card-flip

Was used to create the flip effect on the Watchlist and Watched pages.

## Hosting

The app is hosted on [netlify](https://www.netlify.com/) under the domain https://movie-watchlister.netlify.app/.

## API

For login and overall user information I use my own [API](https://github.com/saniochky/watchlist-api) written with **Express.js**, which connects to **MongoDB**.

For movie recommendations and, eventually, across the application, I use [TMDB API](https://www.themoviedb.org/documentation/api).

## Design

The design of the app is not the best. I tried to make it as good as possible but I am not much a designer.

## Future releases

~~I plan to add a login page and write a backend for this app~~ (done).

I am also working on a mobile version of the app. Furthermore, I want to add ~~movie filters~~ (done), movie and user search. I hope that these and many other updates will be available in the nearest future.
