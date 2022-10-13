import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {AuthContextProvider} from './store/auth-context';
import {BrowserRouter} from 'react-router-dom';
import store from './store/redux-store';
import App from './App';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <AuthContextProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </AuthContextProvider>
    </Provider>
);
