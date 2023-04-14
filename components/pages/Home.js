import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.scss';
import stylesF from '../../styles/Flashcard.module.scss';
import Flashcard from '../flashcard/Flashcard';
import SortAndFilter from '../sort_and_filter/SortAndFilter';
import { useSession } from 'next-auth/react';
import Loading from '../loading/Loading';

function Home() {
    const configUseSortAndFilter = { sort: true, filter: true }
    const [data, setData] = useState([]);
    const [listTopic, setListTopic] = useState([]);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (!session)
            return;
    }, [])

    return (
        <>
            <Head>
                <title>Flashcard</title>
            </Head>
            <SortAndFilter use={configUseSortAndFilter} setData={setData} listTopic={listTopic} setListTopic={setListTopic} />
            {data.length ?
                <div className={styles.container}>
                    <Flashcard data={data} setData={setData} />
                </div> :
                <Loading classNameContainer={styles.container} quantity={16} classNameBox={stylesF.flashcard}/>
            }
        </>
    )
}

export default Home;