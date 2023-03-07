import axios from "axios";
import { useEffect, useState } from "react";
import styles from '../../styles/Home.module.css';
import IconMenu from '../../assets/icon-menu';
import MenuFlashcard from '../collection/MenuFlashcard';
import images from "assets";

function Flashcard(props) {
    const { data, setData } = props
    const [session, setSession] = useState({ value: '', turn: '' });
    const [showMenu, setShowMenu] = useState(false);
    const [curId, setCurId] = useState(0);
    const [imgIndex, setImgIndex] = useState([]);

    useEffect(() => {
        const item = []
        data.forEach(i => {
            item.push((Math.ceil(Math.random() * 20)))
        });
        setImgIndex(item)
    }, [data])

    useEffect(() => {
        const menu = document.querySelector(`#menu-${curId}`);
        const elm = document.querySelector('.show');

        if (showMenu) {
            elm?.classList.remove('show')
            menu?.classList.remove('show');
        }
        else menu?.classList.add('show');
    }, [showMenu, curId])

    const updateFlashcardHandler = async (e, value, field, id) => {
        if (e.key === 'Enter') {
            await axios.patch(
                'api/flashcard/home',
                {
                    id,
                    field,
                    value,
                },
                {
                    "Content-Type": "application/json",
                }
            );
            console.log('Updated');
        }

    } // updateFlashcardHandler

    const preventEnterKey = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }

    return (
        <>
            {data.map((item, index) => {
                const id = item.id;
                const img = images[`img${imgIndex[index]}`];
                return (
                    <div id={id} /*title={topicName}*/ className={styles.flashcard} key={id}>
                        <img src={img?.src} />
                        <div className={styles['wrap-content']}>
                            <div className={styles['wrap-title']}>
                                <h2
                                    // disable warning when use contentEditable
                                    suppressContentEditableWarning={true}
                                    onKeyUp={(e) => {
                                        updateFlashcardHandler(e, session.value, session.turn, id)
                                        setSession({ turn: 'term', value: e.target.innerText })
                                    }}
                                    onKeyDown={(e) => { preventEnterKey(e) }}
                                    contentEditable
                                >
                                    {item.term}
                                </h2>
                            </div>
                            <div className={styles['wrap-desc']}>
                                <span
                                // suppressContentEditableWarning={true}
                                // onKeyUp={(e) => setSession({ turn: 'description', value: e.target.innerText })}
                                // contentEditable
                                >
                                    {item.description}
                                </span>
                            </div>
                        </div>

                        <button className={styles.update} onClick={(e) => updateFlashcardHandler(e, session.value, session.turn, id)}>Ok</button>
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