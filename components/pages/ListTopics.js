import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../../styles/ListTopic.module.css'

function ListTopics() {
    const [listTopic, setListTopic] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const handler = async () => {
            const data = await axios.get("/api/topic/list-topic");
            const data2 = await axios.get("/api/topic/topic");
            setData(data2.data);
            setListTopic(data.data);
        }
        handler();
    }, [])

    return (
        <>
            <Head>
                <title>List Topics</title>
            </Head>
            <div className={styles.container}>
                {listTopic.map(item => {
                    const topicQuantity = data.find(item2 => item2.topic_id === item.topic_id)
                 
                    return (
                        <Link href={`/topics/${item.topic_id}`} className={styles.topic} key={item.topic_id}>
                            <div className={styles['topic-container']}>
                                <h2>{item.topic}</h2>
                            </div>
                            <div className={styles['quantity-container']}>
                                <span>{topicQuantity?.quantity ? `${topicQuantity?.quantity} flashcard` : 'Empty'}</span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}

export default ListTopics;

