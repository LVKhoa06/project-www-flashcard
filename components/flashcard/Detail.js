import images from "assets";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from '../../styles/Flashcard.module.css'

function FlashcardDetail({ data, imgIndex, index }) {
    const [result, setResult] = useState([data]);

    useEffect(() => {
        setResult([data]);
    }, [data]);

    return (
        <>

            {result.map(item => {
                const img = images[`img${imgIndex[index]}`];

                return (
                    <div key={item.id}>
                        <Head>
                            <title>Flashcard - {item?.term}</title>
                        </Head>
                        <div className={styles.overlay}>
                            <div className={styles.container}>
                                <img className={styles['img-fc']} src={img?.src} />
                                <div className={styles.content}>
                                    <input defaultValue={data?.term} />
                                    <textarea defaultValue={data?.description} />
                                    <button>Update</button>
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
