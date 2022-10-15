import styles from './List.module.css';

const List = (props) => {
    return (
        <section>
            <ul className={styles.list}>
                {props.children}
            </ul>
        </section>
    );
};

export default List;
