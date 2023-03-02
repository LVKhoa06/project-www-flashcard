import axios from 'axios';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Home.module.css';
import IconMenu from '../assets/icon-menu';
import Collection from '../Collection';
import MenuFlashcard from '../MenuFlashcard';
import SortAndFilter from '../SortAndFilter';

function Home() {
    const configUseSortAndFilter = { sort: true, filter: true }
    const [data, setData] = useState([]);
    const [session, setSession] = useState({ value: '', turn: '' });
    const [listTopic, setListTopic] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const [curId, setCurId] = useState(0);

    useEffect(() => {
        const menu = document.querySelector(`#menu-${curId}`);
        const foo = document.querySelector('.show');

        if (showMenu) {
            foo?.classList.remove('show')
            menu?.classList.remove('show');
        }
        else menu?.classList.add('show');
    }, [showMenu, curId])
    
    const updateFlashcardHandler = async (value, field, id) => {
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
        console.log('Update');
    } // updateFlashcardHandler

    return (
        <>
            <Head>
                <title>Flashcard</title>
            </Head>
            <SortAndFilter use={configUseSortAndFilter} setData={setData} listTopic={listTopic} setListTopic={setListTopic} />
            <div className={styles.container}>
                {data.map(item => {
                    const id = item.id;
                    const topicName = listTopic.find(topic => topic.topic_id == item.topic_id)?.topic;

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
                                <MenuFlashcard id={id} setShowMenu={setShowMenu} setData={setData}/>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default Home;