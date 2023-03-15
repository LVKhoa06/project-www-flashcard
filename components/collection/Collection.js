import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../../styles/Collection.module.scss'

function Collection(props) {
    const { id, selected, showModal, setShowModal, setShowMenu, result, setResult } = props;
    const [showCreate, setShowCreate] = useState(false);
    const [value, setValue] = useState('');
    const [notification, setNotification] = useState('');
    const [checkedState, setCheckedState] = useState([]);

    useEffect(() => {
        const data = new Array(result.length).fill(false);
        setCheckedState(data);
    }, [result])

    const handleOnChangeCheckbox = async (e, i, collection_id) => {
        const updatedCheckedState = checkedState.map((item, index) => index === i ? !item : item);
        setCheckedState(updatedCheckedState);

        if (e.target.checked) {
            if (checkedState.length > 1) {
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
                console.log('Successfully added to the collection');
            }
        }

        else {
            await axios.delete(`api/collection/collection?f_id=${id}&c_id=${collection_id}`)
            console.log('Deleted');
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
            setResult(data.data);

            setNotification('')
        } else setNotification('Please enter collection name');
        setValue('');
    } // addCollectionHandler

    const closeModalHandler = () => {
        setShowCreate(false);
        setShowModal(false);
        setShowMenu(false);
    } // closeModalHandler

    return (
        <>
            {showModal ?
                <div onClick={() => setShowModal(false)} className={styles.overlay}>
                    <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
                        <div className={styles.header}>
                            <h3>Lưu vào...</h3>
                            <span onClick={() => closeModalHandler()}>x</span>
                        </div>
                        <div className={styles['collection-list']}>
                            {result.map((item, index) => {
                                return (
                                    <div key={item.collection_id} className={styles['input-container']}>
                                        <input
                                            id={item.collection_id}
                                            type="checkbox"
                                            defaultChecked={selected.findIndex(entry => entry.collection_id === item.collection_id) > -1}
                                            onChange={(e) => {
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