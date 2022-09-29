import React from 'react';
import ReactDOM from 'react-dom/client';
import {AuthContextProvider} from './store/auth-context';
import {MoviesContextProvider} from "./store/movies-context";
import {BrowserRouter} from 'react-router-dom';
import App from './App';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <MoviesContextProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </MoviesContextProvider>
    </AuthContextProvider>
);
