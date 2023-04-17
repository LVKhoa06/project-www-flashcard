import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../../styles/Collection.module.scss'
import Notification from '../notification/Notification';
import IconAdd from 'assets/icon-add';
import LoadingSpinner from '../loading/LoadingSpinner';
import { useRouter } from 'next/router';

function Collection(props) {
    const {
        id,
        selected: initializedChecked,
        showModal,
        setShowModal,
        setShowMenu,
        result: collections,
        setResult: setCollections,
        setListFlashcard
    } = props;
    const [showCreate, setShowCreate] = useState(false);
    const [value, setValue] = useState('');
    const [notification, setNotification] = useState('');
    const [checkedStates, setCheckedStates] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreateCollection, setIsCreateCollection] = useState(false);
    const [curId, setCurId] = useState();
    const [isDeleted, setIsDeteted] = useState(false);
    const [collectionPageId, setCollectionPageId] = useState('');
    const router = useRouter();

    const [notificationConfig, setNotificationConfig] = useState({
        show: false,
        type: '',
        message: ''
    })

    useEffect(() => {
        if (!router.query.id)
            return;

        setCollectionPageId(router.query.id);
    }, [router.query.id])

    useEffect(() => {
        let defaultCheckedState = [];

        collections?.forEach(item => {
            defaultCheckedState.push(initializedChecked.findIndex(entry => entry.collection_id === item.collection_id) > -1)
        });

        setCheckedStates(defaultCheckedState);
    }, [initializedChecked])

    const handlerOnChangeCheckbox = async (e, i, collection_id) => {
        const updatedCheckedState = checkedStates?.map((item, index) => index === i ? !item : item);
        setCurId(collection_id);

        if (e.target.checked) {
            setIsLoading(true);
            await axios.patch(
                '/api/collection/collection',
                {
                    id,
                    collection_id
                },
                {
                    "Content-Type": "application/json",
                }
            );

            setIsDeteted(false);
            setIsLoading(false);
            setCheckedStates(updatedCheckedState);
            setNotificationConfig({
                message: 'Successfully added to the collection',
                type: 'success',
                show: !notificationConfig.show
            })
        } else {
            setIsLoading(true);
            await axios.delete(`/api/collection/collection?f_id=${id}&c_id=${collection_id}`)

            if (collectionPageId == collection_id)
                setIsDeteted(true);

            setIsLoading(false);
            setCheckedStates(updatedCheckedState);
            setNotificationConfig({
                message: 'Flashcard removed from collection',
                type: 'warning',
                show: !notificationConfig.show
            })
        }
    } // handleOnChangeCheckbox

    const addCollectionHandler = async () => {
        if (value) {
            setIsCreateCollection(true);
            await axios.post(
                "/api/collection/collection",
                {
                    value
                },
                {
                    "Content-Type": "application/json",
                }
            );
            const data = await axios.get(`/api/collection/list-collection`);
            setCollections(data.data);

            setNotification('')
            setIsCreateCollection(false);
        } else setNotification('Please enter collection name');
        setValue('');
    } // addCollectionHandler

    const closeModalHandler = () => {
        setShowCreate(false);
        setShowModal(false);
        setShowMenu(false);
        setNotificationConfig({
            message: '',
            show: !notificationConfig.show,
            type: ''
        });

        if (setListFlashcard && isDeleted) {
            setListFlashcard((prev) => {
                return prev.filter((item) => item.id !== id)
            })
        }
    } // closeModalHandler

    return (
        <>
            <Notification config={notificationConfig} />
            {showModal ?
                <div onClick={() => closeModalHandler()} className={styles.overlay}>
                    <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
                        <div className={styles.header}>
                            <h3>Lưu vào...</h3>
                            <span onClick={() => closeModalHandler()}>x</span>
                        </div>
                        <div className={styles['collection-list']}>
                            {collections.length ?
                                collections.map((item, index) => {
                                    return (
                                        <div id={`collection-${item.collection_id}`} key={item.collection_id} className={styles['input-container']}>
                                            <input
                                                disabled={isLoading}
                                                id={item.collection_id}
                                                type="checkbox"
                                                checked={checkedStates[index]}
                                                onChange={(e) => {
                                                    handlerOnChangeCheckbox(e, index, item.collection_id)
                                                }} />
                                            <label>{item.collection}</label>
                                            {
                                                isLoading && curId === item.collection_id ?
                                                    <div className={styles['input-loading']}>
                                                        <LoadingSpinner />
                                                    </div> :
                                                    ""
                                            }
                                        </div>
                                    )
                                }) :
                                <div className={styles.loading}>
                                    <LoadingSpinner />
                                </div>
                            }
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
                                    <button className={`${isCreateCollection ? 'disable' : ''}`} onClick={() => {
                                        addCollectionHandler();
                                    }}>Create</button>
                                </div>
                            </>
                            :
                            <div onClick={() => {
                                setShowCreate(true);
                            }} className={styles.create}>
                                <span><IconAdd width="20px" height="20px" fill="#666" viewBox="0 0 39 24" /></span>
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