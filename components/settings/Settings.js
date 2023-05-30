import styles from '../../styles/Settings.module.scss'
import DarkMode from './DarkMode';
import Paging from './Paging';

function Settings(props) {
    const { show, setShow } = props;

    return (
        <div className={styles.overlay} onClick={() => setShow(false)}>
            <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
                <div className={styles.top}>
                    <span onClick={(e) => {
                        setShow(false)
                    }} className={styles.close}>x</span>
                </div>
                <div className={styles.center}>
                    <div className={styles.item}>
                        <span>Dark Mode</span>
                        <DarkMode />
                    </div>
                    <div className={styles.item}>
                        <span>Paging</span>
                        <Paging />
                        </div>
                </div>
                {/* <div className={styles.bottom}>
                    <button>Update</button>
                </div> */}
            </div>
        </div>
    );
}

export default Settings;