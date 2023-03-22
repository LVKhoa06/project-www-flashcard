import { useEffect, useState } from "react";
import axios from "axios";
import formatDateWithLocale from "utils/format-date.";
import Head from "next/head";
import styles from '../../styles/CreateFlashcard.module.scss'
import Notification from "../notification/Notification";
import Select from "../select";
import { useSession } from "next-auth/react";


function Create() {
    const { data: session, status } = useSession();
    const [topicId, setTopicId] = useState(-1);
    const [term, setTerm] = useState('');
    const [description, setDiscription] = useState('');
    const [notificationConfig, setNotificationConfig] = useState({
        show: false,
        type: '',
        message: ''
    });

    const date = formatDateWithLocale({
        format: "YYYY-MM-DD",
        input: new Date(),
    });

    async function handlerCreate(e) {
        e.preventDefault();

        if (term === '') {
            setNotificationConfig({
                message: 'Please enter Term',
                type: 'warning',
                show: !notificationConfig.show
            })
            return;
        }

        if (description === '') {
            setNotificationConfig({
                message: 'Please enter Description',
                type: 'warning',
                show: !notificationConfig.show
            })
            return;
        }

        const checkTermAlreadyExitOrNot = await axios.get(`/api/flashcard/check-term?term=${term}`);

        if (!checkTermAlreadyExitOrNot.data[0].term) {
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
                message: 'Create flashcard successfuly',
                type: 'success',
                show: !notificationConfig.show
            })

            return;
        } else {

            setNotificationConfig({
                message: 'Term already exist',
                type: 'error',
                show: !notificationConfig.show
            })

            return;
        }
    } // handlerCreate

    return (
        <>
            <Notification config={notificationConfig} />
            <Head>
                <title>Create Flashcard</title>
            </Head>
            <div className={styles.container}>
                <h3>Create a new flashcard</h3>
                <form className={styles} >
                    <div className={styles['container-option']} >
                        <span>Topic:</span>
                        {session &&
                            <Select onChange={setTopicId} >
                                <option value={-1}>Khác</option>
                            </Select>
                        }

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