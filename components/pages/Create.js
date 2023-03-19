import { useEffect, useState } from "react";
import axios from "axios";
import formatDateWithLocale from "utils/format-date.";
import Head from "next/head";
import styles from '../../styles/CreateFlashcard.module.scss'
import Notification from "../notification/Notification";
import Select from "../select";


function Create() {
    const [listTopic, setListTopic] = useState([]);
    const [listFlashcard, setListFlashcard] = useState([]);
    const [topicId, setTopicId] = useState(-1);
    const [term, setTerm] = useState('');
    const [description, setDiscription] = useState('');
    const [notificationConfig, setNotificationConfig] = useState({
        show: false,
        type: '',
        message: ''
    })

    useEffect(() => {
        const handler = async () => {
            const data = await axios.get("/api/topic/list-topic");
            const data2 = await axios.get("/api/flashcard/home");
            setListTopic(data.data.filter(item => item.topic_id !== -1));
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

        if (term === '') {
            setNotificationConfig({
                message:'Please enter Term',
                type:'warning',
                show: !notificationConfig.show
            })
            return;
        }

        if (description === '') {
            setNotificationConfig({
                message:'Please enter Description',
                type:'warning',
                show: !notificationConfig.show
            })
            return;
        }

        const data2 = await axios.get("/api/flashcard/home");
        let post = data2.data.find(item => item.term.toUpperCase() === term.toUpperCase());

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
            setNotificationConfig({
                message:'Create flashcard successfuly',
                type:'success',
                show: !notificationConfig.show
            })
            
            return;
        } else {

            setNotificationConfig({
                message:'Term already exist',
                type:'error',
                show: !notificationConfig.show
            })
            
            return;
        }
    } // handlerCreate

    return (
        <>
            <Notification config={notificationConfig}/>
            <Head>
                <title>Create Flashcard</title>
            </Head>
            <div className={styles.container}>
                <h3>Create a new flashcard</h3>
                <form className={styles} >
                    <div className={styles['container-option']} >
                        <span>Topic:</span>
                        <Select func={setTopicId} data={listTopic} >
                            <option value={-1}>Khác</option>
                        </Select>
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