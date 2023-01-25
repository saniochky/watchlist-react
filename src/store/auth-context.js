import {createContext, useState} from 'react';
import {API} from '../constants/constants';

const AuthContext = createContext({
    token: '',
    isLoggedIn: false,
    register: (username, password) => {
    },
    login: (username, password) => {
    },
    logout: () => {
    },
    changePassword: (oldPassword, newPassword) => {
    },
    deleteAccount: () => {
    },
    loading: false,
    error: null,
    success: null,
    clearError: () => {
    },
});

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const userIsLoggedIn = !!token;

    const registerHandler = (username, password) => {
        setLoading(true);
        return fetch(`${API}auth/register`, {
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
        fetch(`${API}auth/login`, {
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
            setToken(data.token);
            setLoading(false);
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

    const changePasswordHandler = (oldPassword, newPassword) => {
        setLoading(true);
        fetch(`${API}users`, {
            method: 'PATCH',
            body: JSON.stringify({oldPassword, newPassword}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
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
            setToken(data.token);
            setLoading(false);
            setSuccess('Password changed successfully');
        }).catch(error => {
            setLoading(false);
            setError(error.message);
            return {message: 'error'};
        });
    };

    const deleteAccountHandler = () => {
        fetch(`${API}users`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
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
            localStorage.removeItem('token');
            setToken(null);
        }).catch(error => {
            setError(error.message);
            return {message: 'error'};
        });
    };

    const clearErrorHandler = () => {
        setError(null);
    };

    const clearSuccessHandler = () => {
        setSuccess(null);
    };

    const context = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        register: registerHandler,
        login: loginHandler,
        logout: logoutHandler,
        changePassword: changePasswordHandler,
        deleteAccount: deleteAccountHandler,
        loading: loading,
        error: error,
        success: success,
        clearError: clearErrorHandler,
        clearSuccess: clearSuccessHandler,
    };

    return (
        <AuthContext.Provider value={context}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
