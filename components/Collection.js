import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Collection.module.css'

function Collection(props) {
    const { id, showModal, setShowModal, setShowMenu, result, setResult } = props;
    const [showCreate, setShowCreate] = useState(false);
    const [value, setValue] = useState('');
    const [notification, setNotification] = useState('');
    const [checkedState, setCheckedState] = useState([]);
    const [result2, setResult2] = useState([]);
    const [collectionId, setCollection_id] = useState(0);
    const [foo, setFoo] = useState(true);
    const [foo2, setFoo2] = useState(true);
    const [curCheck, setCurCheck] = useState(-1);

    useEffect(() => {
        const handler = async () => {
            if (checkedState.length > 1 && foo) {
                console.log('Added');
                // console.log('Successfully added to the collection');
                setFoo(false);
                axios.patch(
                    'api/collection',
                    {
                        id,
                        collection_id: collectionId
                    },
                    {
                        "Content-Type": "application/json",
                    }
                )
            }
        }

        handler();
    }, [collectionId, foo2])

    useEffect(() => {
        setResult2(result.filter(item => item.collection_id !== -1));
    }, [result])

    useEffect(() => {
        const data = new Array(result2.length).fill(false);
        data.unshift(false);
        setCheckedState(data);
    }, [result2])


    const handleOnChangeCheckbox = async (e, i, collection_id) => {
        const updatedCheckedState = checkedState.map((item, index) => index === i ? !item : item);
        setCheckedState(updatedCheckedState);

        if (e.target.checked) {
            setCollection_id(collection_id);
            setFoo2(!foo2);
        }
        else {
            const deleted = await axios.delete(`api/collection?f_id=${id}&c_id=${collection_id}`)
            // console.log(deleted.data.message);
            console.log('Deleted');
            setFoo(true)
        }

    } // handleOnChangeCheckbox

    const addCollectionHandler = async () => {
        if (value) {
            await axios.post(
                "/api/collection",
                {
                    filed: 'collection',
                    value
                },
                {
                    "Content-Type": "application/json",
                }
            );

            const data = await axios.get(`/api/list-collection`);
            setResult(data.data);

            setNotification('')
        } else setNotification('Please enter collection name');
        setValue('');
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
                                <input
                                    type="checkbox"
                                    onChange={(e) => {
                                        setCurCheck(-1)
                                        handleOnChangeCheckbox(e, 0, -1)
                                    }}
                                />
                                <label>Khác</label>
                            </div>
                            {result2.map((item, index) => {
                                return (
                                    <div key={item.collection_id} className={styles['input-container']}>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                setCurCheck(item.collection_id)
                                                handleOnChangeCheckbox(e, index + 1, item.collection_id)
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