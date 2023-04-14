import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../../styles/ListCollection.module.scss'
import { useSession } from 'next-auth/react';
import Loading from '../Loading';

function ListCollections() {
    const [dataCountCollection, setDataCountCollection] = useState([]);
    const [listCollection, setListCollection] = useState([]);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (!session)
            return;

        const handler = async () => {
            const data1 = await axios.get("/api/collection/collection");
            const data2 = await axios.get("/api/collection/list-collection");

            setListCollection(data2.data);
            setDataCountCollection(data1.data);
        }
        handler();
    }, [])

    return (
        <>
            <Head>
                <title>List Collection</title>
            </Head>
            {
                listCollection.length && dataCountCollection.length ?
                    <div className={styles.container}>
                        {listCollection.map((item, index) => {
                            const quantity = dataCountCollection.find(itemx => itemx.collection == item.collection)

                            return (
                                <Link href={`/collections/${item.collection_id}`} className={styles.collection} key={index}>
                                    <div className={styles.term}>
                                        <h2>{item.collection}</h2>
                                    </div>
                                    <div className={styles['quantity-container']}>
                                        <span>{quantity ? `${quantity.quantity} flashcard` : 'Empty'}</span>
                                    </div>
                                </Link>
                            )
                        })}
                    </div> :
                    <Loading classNameContainer={styles.container} quantity={16} classNameBox={styles.collection}/>
            }


        </>
    )
}

export default ListCollections;

