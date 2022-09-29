import useInput from '../../hooks/use-input';

import styles from './AuthForm.module.css';

const AuthForm = (props) => {
    const {
        value: username,
        isValid: usernameIsValid,
        hasError: usernameHasError,
        valueChangeHandler: usernameChangeHandler,
        inputFocusHandler: usernameFocusHandler,
        reset: resetUsernameInput,
    } = useInput(value => RegExp('^[a-zA-Z0-9]{4,16}$').test(value.trim()));

    const {
        value: password,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputFocusHandler: passwordFocusHandler,
        reset: resetPasswordInput,
    } = useInput(value => RegExp('^[a-zA-Z0-9]{8,32}$').test(value));

    let formIsValid = false;

    if (usernameIsValid && passwordIsValid) {
        formIsValid = true;
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const usernameValue = username.trim();
        const passwordValue = password.trim();
        resetUsernameInput();
        resetPasswordInput();
        props.onSubmit(usernameValue, passwordValue);
    };

    return (
        <form onSubmit={submitHandler}>
            <div className={`${styles.control} ${usernameHasError && styles.invalid}`}>
                <label htmlFor="username">Enter username:</label>
                <input id="username" type="text" value={username} onChange={usernameChangeHandler}
                       onFocus={usernameFocusHandler}/>
            </div>
            <div className={`${styles.control} ${passwordHasError && styles.invalid}`}>
                <label htmlFor="password">Enter password:</label>
                <input id="password" type="password" value={password} onChange={passwordChangeHandler}
                       onFocus={passwordFocusHandler}/>
            </div>
            <div className={styles.actions}>
                <button type="submit" disabled={props.loading || !formIsValid}>
                    {props.loading ? "Loading..." : props.buttonText}
                </button>
            </div>
        </form>
    );
};

export default AuthForm;
