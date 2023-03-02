import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../styles/Collection.module.css'

function Collection(props) {
    const { showModal, setShowModal, setShowMenu } = props;
    const [showCreate, setShowCreate] = useState(false);
    const [value, setValue] = useState('');
    const [result, setResult] = useState([]);
    const [notification, setNotification] = useState([]);

    useEffect(() => {
        const handler = async () => {
            const data = await axios.get(`/api/list-collection`);
            setResult(data.data);
        }
        handler();
    }, [notification]);

    const addCollectionHandler = async () => {
        if (value) {
            await axios.post(
                "/api/collection",
                {
                    filed: 'collection',
                    value: value
                },
                {
                    "Content-Type": "application/json",
                }
            );
            setNotification('')
        } else setNotification('Please enter collection name');
    } // addCollectionHandler

    const closeModalHandler = () => {
        setShowCreate(false);
        setShowModal(false);
        setShowMenu(true);
    } // closeModalHandler

    return (
        <>
            {showModal ?
                <div onClick={(e) => e.stopPropagation()} className={styles.overlay}>
                    <div className={styles.modal}>
                        <div className={styles.header}>
                            <h3>Lưu vào...</h3>
                            <span onClick={() => closeModalHandler()}>x</span>
                        </div>
                        <div className={styles['collection-list']}>
                            <div className={styles['input-container']}>
                                <input type="checkbox" />
                                <span>Khác</span>
                            </div>
                            {result.map(item => {
                                return (
                                    <div key={item.collection_id} className={styles['input-container']}>
                                        <input type="checkbox" />
                                        <span>{item.collection}</span>
                                    </div>
                                )
                            })}
                        </div>

                        {showCreate ?
                            <>
                                <div className={styles['add-collection']}>
                                    <div>
                                        <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter collection name" />
                                        <span>{notification}</span>
                                    </div>
                                </div>
                                <div className={styles.footer}>
                                    <button onClick={() => {
                                        addCollectionHandler();
                                    }}>Create</button>
                                </div>
                            </>
                            :
                            <div onClick={() => {
                                setShowCreate(true);
                            }} className={styles.create}>
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