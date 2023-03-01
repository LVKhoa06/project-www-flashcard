import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../../styles/ListTopic.module.css'

function ListTopics() {
    const [listTopic, setListTopic] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const handler = async () => {
            const data = await axios.get("/api/list-topic");
            const data2 = await axios.get("/api/topic");
            setData(data2.data);
            setListTopic(data.data);
        }
        handler();
    }, [])

    useEffect(() => {
    }, [data])

    return (
        <>
            <div className={styles.container}>
                {listTopic.map(item => {
                    return (
                        <Link href={`/topics/${item.topic_id}`} className={styles.topic} key={item.topic_id}>
                            <div className={styles['topic-container']}>
                                <h2>{item.topic}</h2>
                            </div>

                            <div className={styles['quantity-container']}>
                                <span>{data[item.topic_id - 1] ? `${data[item.topic_id - 1]} flashcard` : 'Empty'}</span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}

export default ListTopics;

