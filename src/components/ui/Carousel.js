import {useRef, useState, useEffect} from 'react';
import {motion} from 'framer-motion';

import styles from './Carousel.module.css';

const Carousel = (props) => {
    const [width, setWidth] = useState(0);
    const carousel = useRef();

    useEffect(() => {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }, []);

    return (
        <motion.div ref={carousel} className={styles.carousel} whileTap={{cursor: 'grabbing'}}>
            <motion.div drag='x' dragConstraints={{right: 0, left: -width}} className={styles.innerCarousel}>
                {props.items.map((item) => {
                    return (
                        <motion.div key={Math.random()} className={styles.item}>
                            {item}
                        </motion.div>
                    );
                })}
            </motion.div>
        </motion.div>
    );
};

export default Carousel;
