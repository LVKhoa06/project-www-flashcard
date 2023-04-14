import styles from '../../styles/BinLoading.module.scss';

function BinLoading() {
    const arr = [1, 2, 3, 4, 5];

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

export default BinLoading;