import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../../styles/Topic.module.css'

function Topics() {
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
                        <div className={styles.topic} key={item.topic_id}>
                            <div className={styles['topic-container']}>
                                <h2>{item.topic}</h2>
                            </div>

                            <div className={styles['quantity-container']}>
                                <span>{data[item.topic_id - 1]} flashcard</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Topics;

