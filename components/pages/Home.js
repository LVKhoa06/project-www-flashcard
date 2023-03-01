import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';
import SortAndFilter from '../Sort';

function Home() {
    const configUseSortAndFilter = { sort: true, filter: true }
    const [data, setData] = useState([]);
    const [session, setSession] = useState({ value: '', turn: '' });
    const [listTopic, setListTopic] = useState([]);

    const deleteFlashcardHandler = async (id) => {
        axios.delete(`api/home?id=${id}`);

        setData(prev => {
            return prev.filter(item => {
                return item.id !== id;
            })
        });
    } // deleteFlashcardHandler

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
                        <div title={topicName} className={styles.flashcard} key={id}>
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
                            <div className={styles.delete} onClick={() => deleteFlashcardHandler(id)}>❌</div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default Home;