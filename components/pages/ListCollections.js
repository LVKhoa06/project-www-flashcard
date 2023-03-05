import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../../styles/ListCollection.module.css'

function ListCollections() {
    const [listCollection, setListCollection] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const handler = async () => {
            const data = await axios.get("/api/collection/list-collection");
            const data2 = await axios.get("/api/collection/collection");
            setListCollection(data.data);
            setData(data2.data);
        }
        handler();
    }, [])

    return (
        <>
            <Head>
                <title>List Collection</title>
            </Head>
            <div className={styles.container}>
                {listCollection.map((item, index) => {
                    const collectionQuantity = data.find(item2 => item2.collection_id === item.collection_id)

                    return (
                        <Link href={`/collections/${item.collection_id}`} className={styles.collection} key={index}>
                            <div className={''}>
                                <h2>{item.collection}</h2>
                            </div>
                            <div className={styles['quantity-container']}>
                                <span>{collectionQuantity?.quantity ? `${collectionQuantity?.quantity} flashcard` : 'Empty'}</span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}

export default ListCollections;

