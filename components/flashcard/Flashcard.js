import axios from "axios";
import { useEffect, useState } from "react";
import styles from '../../styles/Flashcard.module.scss';
import IconMenu from '../../assets/icon-menu';
import MenuFlashcard from '../collection/MenuFlashcard';
import images from "assets";
import FlashcardDetail from "./Detail";
import Notification from "../notification/Notification";

function Flashcard(props) {
    const { data, setData } = props
    const [showMenu, setShowMenu] = useState(false);
    const [curId, setCurId] = useState(0);
    const [show, setShow] = useState(false);
    const [curDetailId, setCurDetailId] = useState(0);
    const [imgIndex, setImgIndex] = useState([]);
    const [deleted, setDelected] = useState(false);

    const [notificationConfig, setNotificationConfig] = useState({
        show: false,
        type: '',
        message: ''
    })

    useEffect(() => {
        const closeElm = () => {
            setShowMenu(false);
        }
        document.addEventListener('click', closeElm);
        return () => document.removeEventListener('click', closeElm)
    }, [])

    useEffect(() => {
        const item = []
        data.forEach(i => {
            item.push((Math.ceil(Math.random() * 20)))
        });
        setImgIndex(item);
    }, [data]);

    useEffect(() => {
        const menu = document.querySelector(`#menu-${curId}`);
        const elm = document.querySelector('.showm');

        if (!showMenu) {
            elm?.classList.remove('showm')
            menu?.classList.remove('showm');
        }
        else menu?.classList.add('showm');
    }, [showMenu, curId])

    useEffect(() => {
        if (curId) 
            setNotificationConfig({
                message: 'Delete Flashcard Successfully',
                type: 'success',
                show: !notificationConfig.show
            })
        

    }, [deleted]);

    const detailHandler = (e, index) => {
        setCurDetailId(index);
        setShow(true);
    }

    return (
        <>
            {<Notification config={notificationConfig} />}
            {show && <FlashcardDetail show={show} setShow={setShow} imgIndex={imgIndex} index={curDetailId} data={data[curDetailId]} />}
            {data.map((item, index) => {
                const id = item.id;
                const img = images[`img${imgIndex[index]}`];
                return (
                    <div onClick={(e) => detailHandler(e, index)} id={id} /*title={topicName}*/ className={`${styles.flashcard}`} key={id}>
                        <div
                        style={{
                            backgroundImage: `url("${item.img ? item.img : img?.src}")`,
                        }}
                         className={styles.img}
                         ></div>
                        <div className={styles['wrap-content']}>
                            <div className={styles['wrap-title']}>
                                <h2
                                    className={`${styles.title} ${item.topic_id < 0 ? 'underline' : ''}`}
                                >
                                    {item.term}
                                </h2>
                            </div>
                            <div className={styles['wrap-desc']}>
                                <span>{item.description}</span>
                            </div>
                        </div>
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurId(id);
                                setShowMenu(!showMenu);
                            }} className={styles['menu-container']}>
                            <IconMenu width='20px' height='20px' />
                            <MenuFlashcard setDelected={setDelected} id={id} setShowMenu={setShowMenu} setData={setData} />
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default Flashcard;