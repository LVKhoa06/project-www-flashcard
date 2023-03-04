import axios from "axios";
import { useEffect, useState } from "react";
import styles from '../styles/Home.module.css';
import IconMenu from '../assets/icon-menu';
import MenuFlashcard from './MenuFlashcard';

function Flashcard(props) {
    const { data, setData } = props
    const [session, setSession] = useState({ value: '', turn: '' });
    const [showMenu, setShowMenu] = useState(false);
    const [curId, setCurId] = useState(0);

    useEffect(() => {
        const menu = document.querySelector(`#menu-${curId}`);
        const elm = document.querySelector('.show');

        if (showMenu) {
            elm?.classList.remove('show')
            menu?.classList.remove('show');
        }
        else menu?.classList.add('show');
    }, [showMenu, curId])

    const updateFlashcardHandler = async (value, field, id) => {
        if (field)
            await axios.patch(
                'api/home',
                {
                    id,
                    field,
                    value,
                },
                {
                    "Content-Type": "application/json",
                }
            );
    } // updateFlashcardHandler

    return (
        <>
            {data.map(item => {
                const id = item.id;

                return (
                    <div id={id} /*title={topicName}*/ className={styles.flashcard} key={id}>
                        <div>
                            <h2
                                // disable warning when use contentEditable
                                suppressContentEditableWarning={true}
                                onKeyUp={(e) => setSession({ turn: 'term', value: e.target.innerText })}
                                contentEditable
                            >
                                {item.term}
                            </h2>
                        </div>
                        <div>
                            <span
                                suppressContentEditableWarning={true}
                                onKeyUp={(e) => setSession({ turn: 'description', value: e.target.innerText })}
                                contentEditable
                            >
                                {item.description}
                            </span>
                        </div>
                        <button className={''} onClick={() => updateFlashcardHandler(session.value, session.turn, id)}>Ok</button>
                        <div
                            onClick={(e) => {
                                setCurId(id);
                                setShowMenu(!showMenu);
                            }} className={styles['menu-container']}>
                            <IconMenu width='20px' height='20px' />
                            <MenuFlashcard id={id} setShowMenu={setShowMenu} setData={setData} />
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default Flashcard;