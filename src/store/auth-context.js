import {createContext, useState} from 'react';

const AuthContext = createContext({
    token: '',
    isLoggedIn: false,
    register: (username, password) => {
    },
    login: (username, password) => {
    },
    logout: () => {
    },
    loading: false,
    error: null,
    clearError: () => {
    },
});

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const userIsLoggedIn = !!token;

    const registerHandler = (username, password) => {
        setLoading(true);
        return fetch('https://movie-watchlister-api.herokuapp.com/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(data => {
                    throw new Error(data.message);
                });
            }
        }).then(data => {
            setLoading(false);
            return data;
        }).catch(error => {
            setLoading(false);
            setError(error.message);
            return {message: 'error'};
        });
    };

    const loginHandler = (username, password) => {
        setLoading(true);
        fetch('https://movie-watchlister-api.herokuapp.com/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(data => {
                    throw new Error(data.message);
                });
            }
        }).then(data => {
            localStorage.setItem('token', data.token);
            setLoading(false);
            setToken(data.token);
        }).catch(error => {
            setLoading(false);
            setError(error.message);
            return {message: 'error'};
        });
    };

    const logoutHandler = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    const clearErrorHandler = () => {
        setError(null);
    };

    const context = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        register: registerHandler,
        login: loginHandler,
        logout: logoutHandler,
        loading: loading,
        error: error,
        clearError: clearErrorHandler,
    };

    return (
        <AuthContext.Provider value={context}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
