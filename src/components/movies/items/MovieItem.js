import {useState, useEffect, useImperativeHandle, forwardRef} from 'react';
import ReactCardFlip from 'react-card-flip';
import CardFrontSide from './CardFrontSide';
import CardBackSide from './CardBackSide';
import BacklightCard from '../../ui/BacklightCard';
import LoadingIndicator from '../../ui/LoadingIndicator';

import styles from './MovieItem.module.css';

const MovieItem = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({flipUpCard: flipUpCardHandler}));
    const [movieData, setMovieData] = useState(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const flippable = props.flippable || false;

    useEffect(() => {
        const abortController = new AbortController();
        fetch(`https://api.themoviedb.org/3/movie/${props.movieId}?api_key=f42aecfe4bb38f5459141677e82f1941`, {
            signal: abortController.signal,
        }).then(
            response => response.json()
        ).then(
            movieData => setMovieData(movieData)
        ).catch(
            error => {
                console.log(error);
            }
        );
    }, [props.movieId]);

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

    if (!movieData) return <li><LoadingIndicator/></li>;

    const frontSide = (
        <CardFrontSide
            movie={movieData}
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
        />
    );

    if (flippable) {
        return (
            <li className={styles.item}>
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
                            movie={movieData}
                            flipCard={flipCardHandler}
                        />
                    </BacklightCard>
                </ReactCardFlip>
            </li>
        );
    }

    return (
        <li className={styles.item}>
            <BacklightCard>
                {frontSide}
            </BacklightCard>
        </li>
    );
});

export default MovieItem;
