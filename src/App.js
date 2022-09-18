import {Route, Routes} from 'react-router-dom';

import './App.css';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import WatchlistPage from './pages/WatchlistPage';
import WatchedPage from './pages/WatchedPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/watchlist' element={<WatchlistPage/>}/>
                <Route path='/watched' element={<WatchedPage/>}/>
                <Route path='/profile' element={<ProfilePage/>}/>
                <Route path='*' element={<NotFoundPage/>}/>
            </Routes>
        </Layout>
    );
}

export default App;
