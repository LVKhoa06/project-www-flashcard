import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../../styles/Home.module.css'


const CONST_SORT_CASE = {
    none: -1,
    alphabeticallyASC: 0,
    alphabeticallyDESC: 1,
    dateASC: 2,
    dateDESC: 3,
}

function Home() {
    const { none, alphabeticallyASC, alphabeticallyDESC, dateASC, dateDESC } = CONST_SORT_CASE
    const [listTopic, setListTopic] = useState([]);
    const [data, setData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ orderBy: 'creation_time', direction: 'desc' });
    const { orderBy, direction } = sortConfig;
    const [session, setSession] = useState({ value: '', turn: '' });
    const [topicId, setTopicId] = useState('');

    useEffect(() => {
        const handler = async () => {
            const data = await axios.get("/api/create");
            setListTopic(data.data);
        }
        handler();
    }, []);

    useEffect(() => {
        const handler = async () => {
            const data = await axios.get(`api/home?topic_id=${topicId}&orderBy=${orderBy}&direction=${direction}`);
            setData(data.data);
        }
        handler();
    }, [sortConfig, topicId]);

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

    const updateSortConfig = async (value) => {
        if (value == none) return;

        if (value == alphabeticallyASC)
            return setSortConfig({ orderBy: 'term', direction: 'asc' });

        if (value == alphabeticallyDESC)
            return setSortConfig({ orderBy: 'term', direction: 'desc' });

        if (value == dateASC)
            return setSortConfig({ orderBy: 'creation_time', direction: 'asc' });

        if (value == dateDESC)
            return setSortConfig({ orderBy: 'creation_time', direction: 'desc' });
    } // updateSortConfig

    return (
        <>
            <Head>
                <title>Flashcard</title>
            </Head>
            <div className={styles.filter}>
                <div>
                    <select
                        onChange={(e) => updateSortConfig(e.target.value)}
                    >
                        <option value={none}>Sắp xếp theo </option>
                        <option value={dateASC}>Mới nhất</option>
                        <option value={dateDESC}>Cũ nhất</option>
                        <option value={alphabeticallyASC}>{`A -> Z`}</option>
                        <option value={alphabeticallyDESC}>{`Z -> A`}</option>
                    </select>
                </div>
                <div>
                    <select
                        onChange={(e) => {
                            setTopicId(e.target.value);
                        }}
                    >
                        <option value="">Theo chủ đề</option>
                        {listTopic.map(item => {
                            return <option key={item.topic_id} value={item.topic_id}>{item.topic}</option>
                        })}
                    </select>
                </div>
            </div>

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
                                    onKeyUp={(e) => setSession({ turn: 'descrption', value: e.target.innerText })}
                                    contentEditable
                                >
                                    {item.descrption}
                                </span>
                            </div>
                            <button className={''} onClick={() => updateFlashcardHandler(session.value, session.turn, id)}>Ok</button>
                            <div className={styles.delete} onClick={() => deleteFlashcardHandler(id)}>x</div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}


export default Home;