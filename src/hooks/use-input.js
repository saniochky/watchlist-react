import {useState, useEffect} from "react";

const useInput = (validateFunc) => {
    const [value, setValue] = useState('');
    const [isInFocus, setIsInFocus] = useState(false);
    const [hasError, setHasError] = useState(false);

    const valueIsValid = validateFunc(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setHasError(!valueIsValid && isInFocus && !!value);
        }, 500);

        return () => clearTimeout(timer);
    }, [value, valueIsValid, isInFocus]);

    const inputFocusHandler = () => {
        setIsInFocus(true);
    };

    const valueChangeHandler = (event) => {
        setValue(event.target.value);
    };

    const reset = () => {
        setValue('');
        setIsInFocus(false);
    };

    return {
        value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputFocusHandler,
        reset,
    };
};

export default useInput;
