import images from "assets";
import IconClose from "assets/icon-close";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from '../../styles/Flashcard.module.scss'
import Notification from "../notification/Notification";
import Select from "../select";

function FlashcardDetail(props) {
    const { data, imgIndex, index, setShow } = props;
    const [result, setResult] = useState([data]);
    const [valueTerm, setValueTerm] = useState('');
    const [valueDesc, setValueDesc] = useState('');
    const [listTopic, setListTopic] = useState([]);
    const [curTopic, setCurtopic] = useState();

    const [notificationConfig, setNotificationConfig] = useState({
        show: false,
        type: '',
        message: ''
    })

    useEffect(() => {
        const handler = async () => {
            const data1 = await axios.get("/api/topic/list-topic");
            const data2 = await axios.get(`/api/topic/cur-topic?id=${data.id}`);
            setListTopic(data1.data);
            setCurtopic(data2.data);
        }
        handler();
    }, []);


    useEffect(() => {
        setResult([data]);
    }, [data]);

    useEffect(() => {
        if (!curTopic)
            return;

        const list = listTopic.filter(item => {
            return item.topic !== curTopic[0].topic;
        });

        setListTopic(list);
    }, [curTopic]);


    const updateFlashcardHandler = async (e, field, id) => {
        const handler = async (value) => {
            await axios.patch(
                'api/flashcard/home',
                {
                    id,
                    field,
                    value
                },
                {
                    "Content-Type": "application/json",
                }
            );
        
            setNotificationConfig({
                message:'Update flashcard successfully.',
                type:'success',
                show: !notificationConfig.show
            })
        }

        if (e.key === 'Enter' && field === 'term')
            return handler(valueTerm);

        if (field === 'description')
            return handler(valueDesc);
    } // updateFlashcardHandler

    const changeTopic = async (value) => {
        await axios.patch(
            'api/topic/cur-topic',
            {
                id: data.id,
                topic_id: value
            },
            {
                "Content-Type": "application/json",
            }
        )

        setNotificationConfig({
            message:'Update flashcard topic successfully.',
            type:'success',
            show: !notificationConfig.show
        })

    } // changeTopic

    return (
        <>
            <Notification config={notificationConfig} />
            <Head>
                <title>Flashcard - {result[0]?.term}</title>
            </Head>
            {result.map(item => {
                const img = images[`img${imgIndex ? imgIndex[index] : Math.ceil(Math.random() * 20)}`];

                return (
                    <div
                        onClick={() => setShow(false)}
                        className={styles.overlay} key={item.id}>
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className={styles.container}
                        >
                            <h1 onClick={() => setShow(false)} className={styles.close}><IconClose /></h1>
                            <div className={styles['container-left']}>
                                <img className={styles['img-fc']} src={img?.src} />
                                <Select data={listTopic} func={changeTopic}>
                                    <option value={curTopic ? curTopic[0]?.topic_id : ''}>{curTopic ? curTopic[0]?.topic : ''}</option>
                                </Select>
                            </div>
                            <div className={styles.content}>
                                <input
                                    onChange={(e) => setValueTerm(e.target.value)}
                                    onKeyUp={(e) => updateFlashcardHandler(e, 'term', item.id)}
                                    defaultValue={data?.term}
                                />
                                <textarea
                                    onChange={(e) => setValueDesc(e.target.value)}
                                    defaultValue={data?.description}
                                />
                                <button
                                    onClick={(e) => updateFlashcardHandler(e, 'description', item.id)}
                                >Update</button>
                            </div>
                        </div>
                    </div>
                )
            })}

        </>
    );
}

export default FlashcardDetail;
