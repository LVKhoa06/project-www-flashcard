import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../../styles/Collection.module.scss'
import Notification from '../notification/Notification';

function Collection(props) {
    const { id, selected: initializedChecked, showModal, setShowModal, setShowMenu, result: collections, setResult: setCollections } = props;
    const [showCreate, setShowCreate] = useState(false);
    const [value, setValue] = useState('');
    const [notification, setNotification] = useState('');
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [checkedStates, setCheckedStates] = useState([]);

    const [notificationConfig, setNotificationConfig] = useState({
        show: false,
        type: '',
        message: ''
    })
    
    useEffect(() => {
        let defaultCheckedState = [];

        collections?.forEach(item => {
            defaultCheckedState.push(initializedChecked.findIndex(entry => entry.collection_id === item.collection_id) > -1)
        });

        setCheckedStates(defaultCheckedState);
    }, [initializedChecked])

    const handlerOnChangeCheckbox = async (e, i, collection_id) => {
        const updatedCheckedState = checkedStates?.map((item, index) => index === i ? !item : item);
        setCheckedStates(updatedCheckedState);

        if (e.target.checked) {
            await axios.patch(
                'api/collection/collection',
                {
                    id,
                    collection_id
                },
                {
                    "Content-Type": "application/json",
                }
            )
            setMessage('Successfully added to the collection');
            setType('success');
            setShowNotification(!showNotification);
        } else {
            await axios.delete(`api/collection/collection?f_id=${id}&c_id=${collection_id}`)
            setMessage('Flashcard removed from collection');
            setType('warning');
            setShowNotification(!showNotification);
        }
    } // handleOnChangeCheckbox

    const addCollectionHandler = async () => {
        if (value) {
            await axios.post(
                "/api/collection/collection",
                {
                    filed: 'collection',
                    value
                },
                {
                    "Content-Type": "application/json",
                }
            );

            const data = await axios.get(`/api/collection/list-collection`);
            setCollections(data.data);

            setNotification('')
        } else setNotification('Please enter collection name');
        setValue('');
    } // addCollectionHandler

    const closeModalHandler = () => {
        setShowCreate(false);
        setShowModal(false);
        setShowMenu(false);
        setMessage('');
        setShowNotification(!showNotification)
    } // closeModalHandler

    return (
        <>
            <Notification type={type} message={message} showNotification={showNotification} />
            {showModal ?
                <div onClick={() => closeModalHandler()} className={styles.overlay}>
                    <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
                        <div className={styles.header}>
                            <h3>Lưu vào...</h3>
                            <span onClick={() => closeModalHandler()}>x</span>
                        </div>
                        <div className={styles['collection-list']}>
                            {collections.map((item, index) => {
                                return (
                                    <div key={item.collection_id} className={styles['input-container']}>
                                        <input
                                            id={item.collection_id}
                                            type="checkbox"
                                            checked={checkedStates[index]}
                                            onChange={(e) => {
                                                handlerOnChangeCheckbox(e, index, item.collection_id)
                                            }} />
                                        <label>{item.collection}</label>
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