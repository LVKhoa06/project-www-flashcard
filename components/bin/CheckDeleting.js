import axios from 'axios';
import styles from '../../styles/ModalCheck.module.scss'

function ModalCheck1(props) {
    const { setShow, setData, id , setShowNotification, setType, setMessage, showNotification } = props;

    const deleteHandler = async () => {
        await axios.patch(
            `api/bin/bin`,
            {
                id
            },
            {
                "Content-Type": "application/json",
            }
        );

        setShow(false);
        setData(prev => prev.filter(item => item.id !== id));
        setMessage('Delete flashcard successfull');
        setType('warning')
        setShowNotification(!showNotification)
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

export default ModalCheck1;