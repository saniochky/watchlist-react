import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import LoadingIndicator from '../../ui/LoadingIndicator';

import styles from './CardFrontSide.module.css';

const defaultButtonStyle = {backgroundColor: 'transparent', opacity: '75%'};

const CardFrontSide = (props) => {
    const [controlsVisible, setControlsVisible] = useState(false);
    const [buttonStyle, setButtonStyle] = useState(defaultButtonStyle);
    const [posterBlur, setPosterBlur] = useState({});

    const buttonHoverColor = props.buttonHoverColor || '#f07c41';
    const buttonBacklightHoverColor = props.buttonBacklightHoverColor || 'ORANGE';
    const hoverButtonStyle = {
        backgroundColor: buttonHoverColor,
        opacity: '100%',
        boxShadow: '0 0 15px ' + buttonHoverColor
    };

    return (
        props.loading ? <div className={styles.card}><LoadingIndicator/></div> : <div
            className={styles.card}
            onMouseEnter={() => setControlsVisible(true)}
            onMouseLeave={() => setControlsVisible(false)}
        >
            <div className={styles.poster}>
                <img src={`https://image.tmdb.org/t/p/w220_and_h330_face${props.movie.poster_path}`}
                     alt={props.movie.title}
                     style={posterBlur}/>
                {controlsVisible && <>
                    <FontAwesomeIcon
                        title={props.leftActionTitle}
                        icon={props.leftActionIcon}
                        className={styles.leftIcon}
                        onClick={() => props.leftActionHandler(props.movie.id)}
                        onMouseEnter={() => {
                            props.changeBacklightCardStyle('GREEN');
                            setPosterBlur({filter: 'blur(3px)'});
                        }}
                        onMouseLeave={() => {
                            props.changeBacklightCardStyle('ORANGE');
                            setPosterBlur({})
                        }}
                    />
                    <FontAwesomeIcon
                        title={props.rightActionTitle}
                        icon={props.rightActionIcon}
                        className={styles.rightIcon}
                        onClick={() => props.rightActionHandler(props.movie.id)}
                        onMouseEnter={() => {
                            props.changeBacklightCardStyle('RED');
                            setPosterBlur({filter: 'blur(3px)'});
                        }}
                        onMouseLeave={() => {
                            props.changeBacklightCardStyle('ORANGE');
                            setPosterBlur({});
                        }}
                    />
                </>}
            </div>
            <div className={styles.title}>
                {!controlsVisible && <h3>{props.movie.title}</h3>}
                {controlsVisible && <button
                    title={props.buttonTitle}
                    className={styles.button}
                    style={buttonStyle}
                    onClick={() => props.buttonClickHandler(props.movie.id)}
                    onMouseEnter={() => {
                        setButtonStyle(hoverButtonStyle);
                        props.changeBacklightCardStyle(buttonBacklightHoverColor);
                    }}
                    onMouseLeave={() => {
                        setButtonStyle(defaultButtonStyle);
                        props.changeBacklightCardStyle('ORANGE');
                    }}
                >{props.buttonName}</button>}
            </div>
        </div>
    );
};

export default CardFrontSide;
