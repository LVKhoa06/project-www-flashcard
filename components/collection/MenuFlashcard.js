import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../../styles/MenuFlashcard.module.css'
import Collection from './Collection';

function MenuFlashcard(props) {
    const { id, setShowMenu, setData } = props;
    const [showModal, setShowModal] = useState(false);
    const [result, setResult] = useState([]);

    const deleteFlashcardHandler = async (id) => {
        axios.delete(`api/flashcard/home?id=${id}`);
        setData(prev => {
            return prev.filter(item => {
                return item.id !== id;
            })
        });
    } // deleteFlashcardHandler

    const requestHandler = () => {
        const handler = async () => {
            const data = await axios.get(`/api/collection/list-collection`);
            setResult(data.data);
        }
        handler();
    }

    return (
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
            <Collection id={id} result={result} setResult={setResult} showModal={showModal} setShowModal={setShowModal} setShowMenu={setShowMenu} />
        </div>
    );
}

export default MenuFlashcard;