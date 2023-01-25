import {useState, useContext} from 'react';
import AuthContext from '../../store/auth-context';
import Modal from '../ui/Modal';

import styles from './Profile.module.css';

const Profile = () => {
    const authCtx = useContext(AuthContext);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordsAreValid, setPasswordsAreValid] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(false);

    const checkIfPasswordsAreValid = (oldPassword, newPassword) => {
        setPasswordsAreValid(
            RegExp('^[a-zA-Z0-9]{8,32}$').test(oldPassword.trim()) &&
            RegExp('^[a-zA-Z0-9]{8,32}$').test(newPassword.trim())
        );
    };

    const oldPasswordChangeHandler = (event) => {
        setOldPassword(event.target.value);
        checkIfPasswordsAreValid(event.target.value, newPassword);
    };

    const newPasswordChangeHandler = (event) => {
        setNewPassword(event.target.value);
        checkIfPasswordsAreValid(oldPassword, event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const oldPasswordValue = oldPassword.trim();
        const newPasswordValue = newPassword.trim();
        setOldPassword('');
        setNewPassword('');
        authCtx.changePassword(oldPasswordValue, newPasswordValue);
    };

    return (
        <div>
            {authCtx.error && <Modal onClose={authCtx.clearError}>
                <h2>{authCtx.error}</h2>
                <button onClick={authCtx.clearError}>Close</button>
            </Modal>}
            {authCtx.success && <Modal onClose={authCtx.clearSuccess}>
                <h2>{authCtx.success}</h2>
                <button onClick={authCtx.clearSuccess}>Close</button>
            </Modal>}
            {deleteAccount && <Modal onClose={() => setDeleteAccount(false)}>
                <h2>Do you really want to delete your account?</h2>
                <button onClick={authCtx.deleteAccount}>Yes</button>
                <button onClick={() => setDeleteAccount(false)}>No</button>
            </Modal>}
            <h2>Change password</h2>
            <form className={styles.form} onSubmit={submitHandler}>
                <label htmlFor="password">Enter your password</label>
                <input id="password" type="password" value={oldPassword} onChange={oldPasswordChangeHandler}/>
                <label htmlFor="newPassword">Enter your new password</label>
                <input id="newPassword" type="password" value={newPassword} onChange={newPasswordChangeHandler}/>
                <button type="submit" disabled={!passwordsAreValid}>
                    {authCtx.loading ? 'Loading...' : 'Change password'}
                </button>
            </form>
            <hr/>
            <h2>Delete account</h2>
            <button className={styles['delete-btn']} onClick={() => setDeleteAccount(true)}>Delete account</button>
        </div>
    );
};

export default Profile;
