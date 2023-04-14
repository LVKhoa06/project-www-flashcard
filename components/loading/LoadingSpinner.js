import styles from '../../styles/LoadingSpinner.module.scss'

function LoadingSpinner() {
    return (
        <div className={styles.container}>
           <div className={styles['loading-spinner']}></div>
        </div>
    );
}

export default LoadingSpinner;