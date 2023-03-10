import { useEffect, useState } from "react";
import axios from "axios";
import formatDateWithLocale from "utils/format-date.";
import Head from "next/head";
import styles from '../../styles/CreateFlashcard.module.css'


function Create() {
    const [listTopic, setListTopic] = useState([]);
    const [listFlashcard, setListFlashcard] = useState([]);
    const [topicId, setTopicId] = useState(-1);
    const [term, setTerm] = useState('');
    const [description, setDiscription] = useState('');

    useEffect(() => {
        const handler = async () => {
            const data = await axios.get("/api/topic/list-topic");
            const data2 = await axios.get("/api/flashcard/home");
            setListTopic(data.data);
            setListFlashcard(data2.data);
        }
        handler();
    }, []);

    const date = formatDateWithLocale({
        format: "YYYY-MM-DD",
        input: new Date(),
    });

    async function handlerCreate(e) {
        e.preventDefault();
        let post = listFlashcard.find(item => item.term === term)

        if (term === '') {
            return console.log('Please enter Term');
        }
        console.log(post);
        if (description === '')
            return console.log('Please enter Description');


        if (!post) {
            await axios.post(
                "/api/flashcard/create",
                {
                    topic_id: topicId,
                    term,
                    description,
                    date
                },
                {
                    "Content-Type": "application/json",
                }
            );
            setTerm('');
            setDiscription('');
        } else {
            console.log('Term already exist');
        }
    } // handlerCreate

    return (
        <>
            <Head>
                <title>Create Flashcard</title>
            </Head>
            <div className={styles.container}>
                <h3>Create a new flashcard</h3>
                <form className={styles} >
                    <div className={styles['container-option']} >
                        <span>Topic:</span>
                        <select
                            onChange={(e) => setTopicId(e.target.value)}
                        >
                            <option value={-1}>Khác</option>

                            {listTopic.map(item => {
                                return item.topic_id > 0 ? <option key={item.topic_id} value={item.topic_id}>{item.topic}</option> : ''

                            })}
                        </select>
                    </div>
                    <div className={styles['container-input']}>
                        <input className={styles['input-term']} value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Term" />
                        <textarea className={styles['input-desc']} value={description} onChange={(e) => setDiscription(e.target.value)} placeholder="Description" />
                        <div className={styles['container-button']}>
                            <button className={styles} onClick={(e) => handlerCreate(e)}>Create</button>
                        </div>
                    </div>

                </form>
            </div>
        </>

    );
}

export default Create;