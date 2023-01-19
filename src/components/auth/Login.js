import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import AuthForm from './AuthForm';
import Modal from '../ui/Modal';
import AuthContext from '../../store/auth-context';

import styles from './Login.module.css';

const Login = () => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div className={styles.login}>
            {authCtx.error && <Modal onClose={authCtx.clearError}>
                <h2>{authCtx.error}</h2>
                <button onClick={authCtx.clearError}>Close</button>
            </Modal>}
            <h2>Login Into Account</h2>
            <p>Use username <em>testuser</em> and password <em>testtest</em> to login into demo account</p>
            <AuthForm buttonText="Login" loading={authCtx.loading} onSubmit={authCtx.login}/>
            <p>Do not have an account? <span onClick={() => navigate('/register')}>Register</span></p>
        </div>
    );
};

export default Login;
