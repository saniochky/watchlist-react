import {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClapperboard} from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../store/auth-context';

import styles from './MainNavigation.module.css';

const MainNavigation = () => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const watchlistCount = useSelector(state => state.watchlist).length;
    const watchedCount = useSelector(state => state.watched).length;

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
                                      title={watchlistCount.toString()}>{watchlistCount}</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/watched'>
                                Watched
                                <span className={styles.badge}
                                      title={watchedCount.toString()}>{watchedCount}</span>
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
