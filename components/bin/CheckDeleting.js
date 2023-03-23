import axios from 'axios';
import styles from '../../styles/ModalCheck.module.scss'

function ModalCheck(props) {
    const { setShow, setData, id, setNotificationConfig, notificationConfig } = props;

    const deleteHandler = async () => {
        await axios.delete(`/api/bin/bin?id=${id}`);

        setShow(false);
        setData(prev => prev.filter(item => item.id !== id));

        setNotificationConfig({
            message: 'Delete flashcard successfull',
            type: 'warning',
            show: !notificationConfig.show
        })
    }

    return (
        <div onClick={() => setShow(false)} className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.top}>
                    <span>Delete Flashcard</span>
                </div>
                <div className={styles.center}>
                    <p>Are you sure you want to delete Flashcard?</p>
                    <p>Note: This is a deleting permanent action and cannot be undone.</p>
                </div>
                <div className={styles.bottom}>
                    <button onClick={() => setShow(false)} className={styles.cancel}>Cancel</button>
                    <button onClick={() => {
                        deleteHandler()
                    }} className={styles.delete}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default ModalCheck;