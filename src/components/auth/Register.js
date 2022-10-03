import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import AuthForm from './AuthForm';
import Modal from '../ui/Modal';
import AuthContext from '../../store/auth-context';

import styles from './Login.module.css';

const Register = () => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const registerHandler = (username, password) => {
        authCtx.register(username, password).then(data => {
            if (data.message !== 'error') {
                navigate('/login');
            }
        });
    };

    return (
        <div className={styles.login}>
            {authCtx.error && <Modal onClose={authCtx.clearError}>
                <h2>{authCtx.error}</h2>
                <button onClick={authCtx.clearError}>Close</button>
            </Modal>}
            <h2>Register New Account</h2>
            <AuthForm buttonText="Register" loading={authCtx.loading} onSubmit={registerHandler}/>
            <p>Already have an account? <span onClick={() => navigate('/login')}>Login</span></p>
        </div>
    );
};

export default Register;
