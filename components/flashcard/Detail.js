import images from "assets";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from '../../styles/Flashcard.module.css'

function FlashcardDetail({ data, imgIndex, index }) {
    const [result, setResult] = useState([data]);
    const [valueTerm, setValueTerm] = useState('');
    const [valueDesc, setValueDesc] = useState('');

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
            console.log('Updated');
        }

        if (e.key === 'Enter' && field === 'term')
            return handler(valueTerm);

        if (field === 'description')
            return handler(valueDesc);
    } // updateFlashcardHandler

    return (
        <>
            {result.map(item => {
                const img = images[`img${imgIndex[index]}`];

                return (
                    <div className={styles.containerF} key={item.id}>
                        <Head>
                            <title>Flashcard - {item?.term}</title>
                        </Head>
                        <div className={styles.overlay}>
                            <div className={styles.container}>
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
                    </div>

                )
            })}

        </>
    );
}

export default FlashcardDetail;
