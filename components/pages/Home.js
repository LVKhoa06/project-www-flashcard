import Head from 'next/head';
import { useState } from 'react';
import styles from '../../styles/Home.module.css';
import Flashcard from '../Flashcard';
import SortAndFilter from '../SortAndFilter';

function Home() {
    const configUseSortAndFilter = { sort: true, filter: true }
    const [data, setData] = useState([]);
    const [listTopic, setListTopic] = useState([]);

    return (
        <>
            <Head>
                <title>Flashcard</title>
            </Head>
            <SortAndFilter use={configUseSortAndFilter} setData={setData} listTopic={listTopic} setListTopic={setListTopic} />
            <div className={styles.container}>
                <Flashcard data={data} setData={setData} listTopic={listTopic} />
            </div>
        </>
    )
}

export default Home;