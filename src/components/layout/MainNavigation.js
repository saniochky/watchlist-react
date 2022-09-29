import {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClapperboard} from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../store/auth-context';
import moviesContext from '../../store/movies-context';

import styles from './MainNavigation.module.css';

const MainNavigation = () => {
    const authCtx = useContext(AuthContext);
    const moviesCtx = useContext(moviesContext);
    const navigate = useNavigate();

    return (
        <header className={styles.header}>
            <div
                className={styles.logo}
                onClick={() => navigate('/')}
            >
                Watch<FontAwesomeIcon icon={faClapperboard}/>List
            </div>
            {authCtx.isLoggedIn &&
                <nav>
                    <ul>
                        <li>
                            <Link to='/watchlist'>
                                Watchlist
                                <span className={styles.badge}
                                      title={moviesCtx.watchlistCount.toString()}>{moviesCtx.watchlistCount}</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/watched'>
                                Watched
                                <span className={styles.badge}
                                      title={moviesCtx.watchedCount.toString()}>{moviesCtx.watchedCount}</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/profile'>Profile</Link>
                        </li>
                        <li>
                            <button onClick={authCtx.logout}>Logout</button>
                        </li>
                    </ul>
                </nav>
            }
        </header>
    );
};

export default MainNavigation;
