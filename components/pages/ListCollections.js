import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../../styles/ListCollection.module.scss'

function ListCollections() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const handler = async () => {
            const data = await axios.get("/api/collection/collection");
            setData(data.data);
        }
        handler();
    }, [])

    return (
        <>
            <Head>
                <title>List Collection</title>
            </Head>
            <div className={styles.container}>
                {data.map((item, index) => {
                    return (
                        <Link href={`/collections/${item.collection_id}`} className={styles.collection} key={index}>
                            <div className={''}>
                                <h2>{item.collection}</h2>
                            </div>
                            <div className={styles['quantity-container']}>
                                <span>{item.quantity ? `${item.quantity} flashcard` : 'Empty'}</span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}

export default ListCollections;

