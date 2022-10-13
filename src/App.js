import {useContext, useEffect} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Layout from './components/layout/Layout';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import WatchlistPage from './pages/WatchlistPage';
import WatchedPage from './pages/WatchedPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import AuthContext from './store/auth-context';
import {fetchMovies} from './store/redux-store';

import './App.css';

const App = () => {
    const authCtx = useContext(AuthContext);
    const dispatch = useDispatch();
    const error = useSelector(state => state.error);

    useEffect(() => {
        if (authCtx.isLoggedIn) {
            dispatch(fetchMovies())
        }
    }, [authCtx, dispatch]);

    useEffect(() => {
        if (['Invalid token', 'Token expired'].includes(error)) {
            authCtx.logout()
        }
    }, [authCtx, error]);

    return (
        <Layout>
            <Routes>
                {authCtx.isLoggedIn &&
                    <>
                        <Route path='/' element={<HomePage/>}/>
                        <Route path='/watchlist' element={<WatchlistPage/>}/>
                        <Route path='/watched' element={<WatchedPage/>}/>
                        <Route path='/profile' element={<ProfilePage/>}/>
                        <Route path='/login' element={<Navigate to='/' replace/>}/>
                        <Route path='/register' element={<Navigate to='/' replace/>}/>
                    </>
                }
                {!authCtx.isLoggedIn &&
                    <>
                        <Route path='/login' element={<LoginPage/>}/>
                        <Route path='/register' element={<RegisterPage/>}/>
                    </>
                }
                <Route path='*' element={authCtx.isLoggedIn ? <NotFoundPage/> : <Navigate to='/login' replace/>}/>
            </Routes>
        </Layout>
    );
};

export default App;
