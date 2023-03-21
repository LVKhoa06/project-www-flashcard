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
    const [curTopic, setCurtopic] = useState();
    const [url, setUrl] = useState('');

    const [notificationConfig, setNotificationConfig] = useState({
        show: false,
        type: '',
        message: ''
    })

    useEffect(() => {
        const handler = async () => {
            const data2 = await axios.get(`/api/topic/cur-topic?id=${data.id}`);
            setCurtopic(data2.data);
        }
        handler();
    }, []);


    useEffect(() => {
        setResult([data]);
    }, [data]);

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
                message: 'Update flashcard successfully.',
                type: 'success',
                show: !notificationConfig.show
            })
        }

        if (e.key === 'Enter' && field === 'term' && valueTerm.trim().length) {
            await handler(valueTerm);

            return setNotificationConfig({
                message: 'Update flashcard term successfully.',
                type: 'success',
                show: !notificationConfig.show
            })
        }

        if (field === 'description' && valueDesc.trim().length) {
            await handler(valueDesc);
            return setNotificationConfig({
                message: 'Update flashcard description successfully.',
                type: 'success',
                show: !notificationConfig.show
            })
        }

        if (valueTerm.trim().length === 0) {
            return setNotificationConfig({
                message: 'Not be to empty term',
                type: 'warning',
                show: !notificationConfig.show
            })
        }
        if (valueDesc.trim().length === 0) {
            console.log('2');
            return setNotificationConfig({
                message: 'Not be to empty description',
                type: 'warning',
                show: !notificationConfig.show
            })
        }
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
            message: 'Update flashcard topic successfully.',
            type: 'success',
            show: !notificationConfig.show
        })
    } // changeTopic

    const convertImgToBase64 = async () => {
        const elm = document.getElementById('test');
        const file = elm?.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            setUrl(reader.result)
        }
    } // 

    useEffect(() => {
        const handler = async () => {
            await axios.patch(
                'api/flashcard/home',
                {
                    id: data.id,
                    field: 'img',
                    value: url
                },
                {
                    "Content-Type": "application/json",
                }
            );
        }

        if (url) handler();
    }, [url])

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
                        className={styles.overlay} key={item.id}
                        style={{
                            backgroundImage: `url("${url ? url : ''}")`
                        }}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className={styles.container}
                        >
                            <div onClick={() => { }} className={styles.demo}>
                                <input id="test" onChange={() => {
                                    convertImgToBase64();
                                }} type="file" />
                            </div>
                            <h1 onClick={() => setShow(false)} className={styles.close}><IconClose /></h1>
                            <div className={styles['container-left']}>
                                <img className={styles['img-fc']} src={img?.src} />
                                <Select onChange={changeTopic} selected={curTopic ? curTopic[0].topic_id : ''} />
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
