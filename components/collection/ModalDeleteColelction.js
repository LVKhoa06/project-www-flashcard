import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../styles/ModalCheck.module.scss'

function ModalCheck({ setShowCheck, id }) {
    const router = useRouter();

    const deleteHandler = async () => {
        if (id === -1) {
            alert('Unable to delete Topic default')
        } else {
            const deleted = await axios.delete(`/api/collection/list-collection?id=${id}`);

            if (deleted.data.success) setTimeout(() => {
                router.replace('/collections')
            }, 300)
        }


        return setShowCheck(false);
    } // deleteHandler

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.top}>
                    <span>Delete Collection</span>
                </div>
                <div className={styles.center}>
                    <p>Are you sure you want to delete Collection?</p>
                    <p>Note: Deleting a collection is a permanent action and cannot be undone.</p>
                </div>
                <div className={styles.bottom}>
                    <button onClick={() => setShowCheck(false)} className={styles.cancel}>Cancel</button>
                    <button onClick={() => deleteHandler()} className={styles.delete}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default ModalCheck;