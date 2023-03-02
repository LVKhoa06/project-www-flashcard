import axios from 'axios';
import { useState } from 'react';
import styles from '../styles/MenuFlashcard.module.css'
import Collection from './Collection';

function MenuFlashcard(props) {
    const { id, setShowMenu, setData } = props;
    const [showModal, setShowModal] = useState(false);
    const deleteFlashcardHandler = async (id) => {
        axios.delete(`api/home?id=${id}`);

        setData(prev => {
            return prev.filter(item => {
                return item.id !== id;
            })
        });
    } // deleteFlashcardHandler
    return (
        <div id={`menu-${id}`} className={`${styles.menu_list}`}>
            <h4 onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
            }}>Add to collection</h4>
            <h4 onClick={(e) => {
                e.stopPropagation();
            }}>Add to Topic</h4>
            <h4 onClick={(e) => {
                e.stopPropagation();
                deleteFlashcardHandler(id)
            }}>Delete </h4>
            <Collection showModal={showModal} setShowModal={setShowModal} setShowMenu={setShowMenu} />
        </div>
    );
}

export default MenuFlashcard;