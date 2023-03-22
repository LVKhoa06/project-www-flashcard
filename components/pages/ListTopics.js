import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../../styles/ListTopic.module.scss'

function ListTopics() {
    const [data, setData] = useState([]);
   
    useEffect(() => {
        const handler = async () => {
            const data = await axios.get("/api/topic/topic");
            setData(data.data);
        }
        handler();
    }, [])

    return (
        <>
            <Head>
                <title>List Topics</title>
            </Head>
            <div className={styles.container}>
                {data.map(item => {
                 
                    return (
                        <Link href={`/topics/${item.topic_id}`} className={styles.topic} key={item.topic_id}>
                            <div className={styles['topic-container']}>
                                <h2>{item.topic}</h2>
                            </div>
                            <div className={styles['quantity-container']}>
                                <span>{item.quantity ? `${item.quantity} flashcard` : 'Empty'}</span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}

export default ListTopics;

