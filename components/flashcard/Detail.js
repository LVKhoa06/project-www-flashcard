import images from "assets";
import IconClose from "assets/icon-close";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from '../../styles/Flashcard.module.scss'
import GetImg from "../image/GetImg";
import Notification from "../notification/Notification";
import Select from "../select";
import DarkMode from "../settings/DarkMode";

function FlashcardDetail(props) {
    const { flashcard, imgIndex, index, setShow, setListFlashcard } = props;
    const [result, setResult] = useState([flashcard]);
    const [valueTerm, setValueTerm] = useState(flashcard?.term);
    const [valueDesc, setValueDesc] = useState(flashcard?.description);
    const [curTopic, setCurtopic] = useState();
    const [showChangeImg, setShowChangeImg] = useState(false);
    const [curImg, setCurImg] = useState('');
    const [isChangedTopic, setIsChangedTopic] = useState(false);
    const [notificationConfig, setNotificationConfig] = useState({
        show: false,
        type: '',
        message: ''
    })

    useEffect(() => {
        const handler = async () => {
            const fetch = await axios.get(`/api/topic/cur-topic?id=${flashcard.id}`);
            setCurtopic(fetch.data);
        }
        handler();

        setCurImg(flashcard.img);
    }, []);


    useEffect(() => {
        setResult([flashcard]);
    }, [flashcard]);

    const updateFlashcardHandler = async (e, field, id) => {
        const handler = async (value) => {
            await axios.patch(
                '/api/flashcard/home',
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
            const checkTermAlreadyExitOrNot = await axios.get(`/api/flashcard/check-term?term=${valueTerm}`);

            if (!checkTermAlreadyExitOrNot.data[0].term) {
                await handler(valueTerm);
                return setNotificationConfig({
                    message: 'Update flashcard term successfully.',
                    type: 'success',
                    show: !notificationConfig.show
                })
            } else {
                return setNotificationConfig({
                    message: 'Term already exist.',
                    type: 'error',
                    show: !notificationConfig.show
                })
            }
        }

        if (field === 'description' && valueDesc.trim().length && e.type === 'click') {
            await handler(valueDesc);
            return setNotificationConfig({
                message: 'Update flashcard description successfully.',
                type: 'success',
                show: !notificationConfig.show
            })
        }

        if (valueTerm.trim().length === 0 && e.key === 'Enter') {
            return setNotificationConfig({
                message: 'Not be to empty term',
                type: 'warning',
                show: !notificationConfig.show
            })
        }
        if (valueDesc.trim().length === 0 && e.type === 'click') {
            return setNotificationConfig({
                message: 'Not be to empty description',
                type: 'warning',
                show: !notificationConfig.show
            })
        }
    } // updateFlashcardHandler

    const changeTopic = async (value) => {
        setIsChangedTopic(+value !== curTopic[0].topic_id);

        await axios.patch(
            '/api/topic/cur-topic',
            {
                id: flashcard.id,
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
        });
    } // changeTopic

    const closeModal = async () => {
        if (isChangedTopic && setListFlashcard)
            await setListFlashcard(prev => {
                return prev.filter((item) => item.id !== flashcard.id);
            })

        setTimeout(() => {
            setShow(false);
        }, 100)
    } // closeModal

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
                        onClick={() => closeModal()}
                        className={styles.overlay} key={item.id}
                    >
                        <div
                            onClick={(e) => {
                                setShowChangeImg(false);
                                e.stopPropagation()
                            }}
                            className={styles.container}
                        >
                            <DarkMode/>
                            <h1 onClick={() => closeModal()} className={styles.close}><IconClose /></h1>
                            <div className={styles['container-left']}>
                                <div
                                    className={styles['img-fc']}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setShowChangeImg(!showChangeImg)
                                    }}
                                    style={{
                                        backgroundImage: `url("${curImg ? curImg : img?.src}")`,
                                    }}
                                >
                                    {showChangeImg && <GetImg setImg={setCurImg} id={flashcard.id} setData={setListFlashcard} />}

                                </div>
                                <Select onChange={changeTopic} selected={curTopic ? curTopic[0].topic_id : ''} />
                            </div>
                            <div className={styles.content}>
                                <input
                                    onChange={(e) => setValueTerm(e.target.value)}
                                    onKeyUp={(e) => updateFlashcardHandler(e, 'term', item.id)}
                                    defaultValue={flashcard?.term}
                                />
                                <textarea
                                    onChange={(e) => setValueDesc(e.target.value)}
                                    defaultValue={flashcard?.description}
                                />
                                <button
                                    onClick={(e) => {
                                        updateFlashcardHandler(e, 'description', item.id)
                                    }}
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
