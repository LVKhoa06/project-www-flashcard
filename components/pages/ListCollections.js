import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../../styles/ListCollection.module.css'

function ListCollections() {
    const [listCollection, setListCollection] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const handler = async () => {
            const data = await axios.get("/api/list-collection");
            const data2 = await axios.get("/api/collection");
            setListCollection(data.data);
            setData(data2.data);
        }
        handler();
    }, [])

    return (
        <>
            <div className={styles.container}>
                {listCollection.map(item => {
                    const collectionQuantity = data.find(item2 => item2.collection_id === item.collection_id)

                    return (
                        <>
                        <Link href={`/collections/${item.collection_id}`} className={styles.collection} key={item.collection_id}>
                            <div className={''}>
                                <h2>{item.collection}</h2>
                            </div>
                            <div className={styles['quantity-container']}>
                                <span>{collectionQuantity?.quantity ? `${collectionQuantity?.quantity} flashcard` : 'Empty'}</span>
                            </div>
                        </Link>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default ListCollections;

