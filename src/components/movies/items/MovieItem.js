import {useState, useImperativeHandle, forwardRef, useRef} from 'react';
import {useInView} from 'framer-motion';
import ReactCardFlip from 'react-card-flip';
import CardFrontSide from './CardFrontSide';
import CardBackSide from './CardBackSide';
import BacklightCard from '../../ui/BacklightCard';

import styles from './MovieItem.module.css';

const MovieItem = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({flipUpCard: flipUpCardHandler, itemInView: inView}));
    const [isFlipped, setIsFlipped] = useState(false);
    const itemRef = useRef(null);
    const inView = useInView(itemRef, {once: true, margin: "0px 0px -8% 0px"});
    const flippable = props.flippable || false;

    const flipCardHandler = () => {
        setIsFlipped((prevState) => {
            if (!prevState) {
                props.flipUpCards();
            }
            return !prevState;
        });
    };

    const flipUpCardHandler = () => {
        if (isFlipped) {
            setIsFlipped(false);
        }
    };

    const frontSide = (
        <CardFrontSide
            movie={props.movie}
            leftActionIcon={props.leftIcon}
            rightActionIcon={props.rightIcon}
            leftActionTitle={props.leftIconTitle}
            rightActionTitle={props.rightIconTitle}
            leftActionHandler={props.leftAction || flipCardHandler}
            rightActionHandler={props.rightAction}
            buttonName={props.buttonName}
            buttonTitle={props.buttonTitle}
            buttonHoverColor={props.buttonHoverColor}
            buttonBacklightHoverColor={props.buttonBacklightHoverColor}
            buttonClickHandler={props.buttonClickHandler}
            badge={props.badge}
        />
    );

    return (
        <li className={styles.item} ref={itemRef}>
            {flippable ?
                <ReactCardFlip
                    isFlipped={isFlipped}
                    flipDirection="horizontal"
                    containerStyle={{width: '100%', height: '100%'}}
                >
                    <BacklightCard>
                        {frontSide}
                    </BacklightCard>
                    <BacklightCard>
                        <CardBackSide
                            movie={props.movie}
                            flipCard={flipCardHandler}
                        />
                    </BacklightCard>
                </ReactCardFlip> :
                <BacklightCard>
                    {frontSide}
                </BacklightCard>}
        </li>
    );
});

export default MovieItem;
