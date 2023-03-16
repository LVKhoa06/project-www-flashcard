import images from "assets";
import IconClose from "assets/icon-close";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from '../../styles/Flashcard.module.scss'
import Notification from "../notification/Notification";

function FlashcardDetail(props) {
    const { data, imgIndex, index, setShow } = props;
    const [result, setResult] = useState([data]);
    const [valueTerm, setValueTerm] = useState('');
    const [valueDesc, setValueDesc] = useState('');
    const [message, setMessage] = useState('');
    const [type, setType] = useState();
    const [showNotification, setShowNotification] = useState(false);
  
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
            setMessage('Update flashcard successfully.');
            setType('success');
            setShowNotification(!showNotification);
        }

        if (e.key === 'Enter' && field === 'term')
            return handler(valueTerm);

        if (field === 'description')
            return handler(valueDesc);
    } // updateFlashcardHandler

    return (
        <>
            <Notification type={type} message={message} showNotification={showNotification} />
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
                            <img className={styles['img-fc']} src={img?.src} />
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
