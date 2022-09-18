import styles from './LoadingIndicator.module.css';

const LoadingIndicator = () => {
    return (
        <div className={styles.pos}>
            <div className={styles.ldsRing}>
                <div />
                <div />
                <div />
                <div />
            </div>
        </div>
    );
};

export default LoadingIndicator;
