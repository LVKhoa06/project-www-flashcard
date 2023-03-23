import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../../styles/MenuFlashcard.module.scss'
import Collection from './Collection';

function MenuFlashcard(props) {
    const { id, setShowMenu, setData, setDelected } = props;
    const [showModal, setShowModal] = useState(false);
    const [result, setResult] = useState([]);
    const [selected, setSelected] = useState([]);

    const deleteFlashcardHandler = async (id) => {
        await axios.delete(`/api/flashcard/home?id=${id}`);
        setData(prev => {
            return prev.filter(item => {
                return item.id !== id;
            })
        });

        setDelected((prev) => !prev);
    } // deleteFlashcardHandler

    const requestHandler = () => {
        const handler = async () => {
            const data = await axios.get(`/api/collection/list-collection`);
            const data2 = await axios.get(`/api/collection/selected-collection?id=${id}`);
            setResult(data.data);
            setSelected(data2.data);
        }
        handler();
    }

    return (
        <>
            <div id={`menu-${id}`} className={`${styles.menu_list}`}>
                <h4 onClick={(e) => {
                    e.stopPropagation();
                    setShowModal(true);
                    requestHandler();
                }}>Add to collection</h4>

                <h4 onClick={(e) => {
                    e.stopPropagation();
                    deleteFlashcardHandler(id)
                }}>Delete </h4>
            </div>
            <Collection selected={selected} id={id} result={result} setResult={setResult} showModal={showModal} setShowModal={setShowModal} setShowMenu={setShowMenu} />
        </>

    );
}

export default MenuFlashcard;