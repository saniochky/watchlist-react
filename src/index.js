import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import './index.css';
import App from './App';
import {MoviesContextProvider} from "./store/movies-context";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MoviesContextProvider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </MoviesContextProvider>
);
