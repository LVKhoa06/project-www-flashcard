import styles from '../../styles/HomeLoading.module.scss';

function HomeLoading() {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    return (
        <div className={styles.container}>
            {arr.map(() => {
                return (
                    <div className={styles.box}>
                    </div>
                )
            })}
        </div>
    );
}

export default HomeLoading;