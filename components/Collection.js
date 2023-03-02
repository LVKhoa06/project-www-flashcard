import { useEffect, useState } from 'react';
import styles from '../styles/Collection.module.css'

function Collection({ showModal, setShowModal, setShowMenu }) {
    const [showCreate, setShowCreate] = useState(false);

    const addCollectionHandler = () => {

    } // addCollectionHandler

    return (
        <>
            {showModal ?
                <div onClick={(e) => e.stopPropagation()} className={styles.overlay}>
                    <div className={styles.modal}>
                        <div className={styles.header}>
                            <h3>Lưu vào...</h3>
                            <span onClick={() => {
                                setShowCreate(false);
                                setShowModal(false);
                                setShowMenu(true);
                            }}>x</span>
                        </div>
                        <div className={styles['collection-list']}>
                            <div className={styles['input-container']}>
                                <input type="checkbox" />
                                <span>Khác</span>
                            </div>
                            <div className={styles['input-container']}>
                                <input type="checkbox" />
                                <span>Hello</span>
                            </div>
                            {/* arr.map() */}
                        </div>

                        {showCreate ?
                            <>
                                <div className={styles['add-collection']}>
                                    <div>
                                        <input placeholder="Enter collection name" />
                                    </div>
                                </div>
                                <div className={styles.footer}>
                                    <button onClick={() => {
                                        setShowCreate(false);
                                        setShowModal(false);
                                        setShowMenu(true);
                                    }}>Create</button>
                                </div>
                            </>
                            :
                            <div onClick={() => setShowCreate(true)} className={styles.create}>
                                <span>➕</span>
                                Create new collection
                            </div>
                        }
                    </div>
                </div>
                : ''}

        </>

    );
}

export default Collection;