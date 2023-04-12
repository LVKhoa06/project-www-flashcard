import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../../styles/ListTopic.module.scss'
import { useSession } from 'next-auth/react';

function ListTopics() {
    const [listTopicQuantity, setListTopicQuantity] = useState([]);
    const [listTopic, setListTopic] = useState([]);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (!session) return;
        const handler = async () => {
            const quantity = await axios.get("/api/topic/topic");
            const topics = await axios.get("/api/topic/list-topic");
            
            setListTopicQuantity(quantity.data);
            setListTopic(topics.data);
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
                    const quantity = listTopicQuantity.find(itemx => itemx.topic == item.topic)

                    return (
                        <Link href={`/topics/${item.topic_id}`} className={styles.topic} key={item.topic_id}>
                            <div className={styles['topic-container']}>
                                <h2>{item.topic}</h2>
                            </div>
                            <div className={styles['quantity-container']}>
                                <span>{quantity?.quantity ? `${quantity.quantity} flashcard` : 'Empty'}</span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}

export default ListTopics;

