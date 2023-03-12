import axios from "axios";
import { useEffect, useState } from "react";
import styles from '../../styles/Home.module.css';
import IconMenu from '../../assets/icon-menu';
import MenuFlashcard from '../collection/MenuFlashcard';
import images from "assets";
import FlashcardDetail from "./Detail";

function Flashcard(props) {
    const { data, setData } = props
    const [session, setSession] = useState({ value: '', turn: '' });
    const [showMenu, setShowMenu] = useState(false);
    const [curId, setCurId] = useState(0);
    const [show, setShow] = useState(false);
    const [curDetailId, setCurDetailId] = useState(0);
    const [imgIndex, setImgIndex] = useState([]);

    useEffect(() => {
        const item = []
        data.forEach(i => {
            item.push((Math.ceil(Math.random() * 20)))
        });
        setImgIndex(item)
    }, [data]);

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

    const detailHandler = (e, index) => {
        e.stopPropagation()
        document.querySelector('body').scrollTo({
            top: 0,
            behavior: `smooth`
        });
        setCurDetailId(index);
        setShow(true);
    }

    return (
        <>
            {data.map((item, index) => {
                const id = item.id;
                const img = images[`img${imgIndex[index]}`];
                return (
                    <>
                        <div onClick={(e) => detailHandler(e, index)} id={id} /*title={topicName}*/ className={styles.flashcard} key={id}>
                            <img src={img?.src} />
                            <div className={styles['wrap-content']}>
                                <div className={styles['wrap-title']}>
                                    <h2
                                        // disable warning when use contentEditable
                                        suppressContentEditableWarning={true}
                                        onKeyUp={(e) => {
                                            setSession({ turn: 'term', value: e.target.innerText })
                                            updateFlashcardHandler(e, session.value, session.turn, id)
                                        }}
                                        onKeyDown={(e) => preventEnterKey(e)}
                                        onClick={(e) => e.stopPropagation()}
                                        contentEditable
                                    >
                                        {item.term}
                                    </h2>
                                </div>
                                <div className={styles['wrap-desc']}>
                                    <span>{item.description}</span>
                                </div>
                            </div>

                            <button className={styles.update} onClick={(e) => updateFlashcardHandler(e, session.value, session.turn, id)}>Ok</button>
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurId(id);
                                    setShowMenu(!showMenu);
                                }} className={styles['menu-container']}>
                                <IconMenu width='20px' height='20px' />
                                <MenuFlashcard id={id} setShowMenu={setShowMenu} setData={setData} />
                            </div>
                        </div>
                        {show ? <FlashcardDetail show={show} setShow={setShow} imgIndex={imgIndex} index={curDetailId} data={data[curDetailId]} /> : ''} 
                    </>
                );
            })}
        </>
    );
}

export default Flashcard;