import {useReducer, cloneElement} from 'react';

import styles from './BacklightCard.module.css';

const defaultBacklightCardStyle = {
    border: 'rgba(58, 175, 169, 0.75) 1px solid',
    boxShadow: 'none',
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'RED':
            return {
                border: 'red 1px solid',
                boxShadow: 'red -4px 4px 12px',
            };
        case 'GREEN':
            return {
                border: 'green 1px solid',
                boxShadow: 'green -4px 4px 12px',
            };
        case 'YELLOW':
            return {
                border: '#feb83e 1px solid',
                boxShadow: '#feb83e -4px 4px 12px',
            };
        case 'ORANGE':
            return {
                border: '#f07c41 1px solid',
                boxShadow: '#f07c41 -4px 4px 12px',
            };
        default:
            return {
                border: 'rgba(58, 175, 169, 0.75) 1px solid',
                boxShadow: 'none',
            };
    }
};

const BacklightCard = (props) => {
    const [backlightCardStyle, dispatch] = useReducer(reducer, defaultBacklightCardStyle);

    const setBacklightCardStyle = (color) => {
        dispatch({type: color});
    };

    return (
        <div
            className={styles.backlightCard}
            style={backlightCardStyle}
            onMouseEnter={() => setBacklightCardStyle('ORANGE')}
            onMouseLeave={() => setBacklightCardStyle('DEFAULT')}
        >
            {cloneElement(props.children, {changeBacklightCardStyle: setBacklightCardStyle})}
        </div>
    );
};

export default BacklightCard;
