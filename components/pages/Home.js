import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';
import FlashcardDetail from '../flashcard/Detail';
import Flashcard from '../flashcard/Flashcard';
import SortAndFilter from '../sort_and_filter/SortAndFilter';

function Home() {
    const configUseSortAndFilter = { sort: true, filter: true }
    const [data, setData] = useState([]);
    const [listTopic, setListTopic] = useState([]);
    const [curDetailId, setCurDetailId] = useState(0);
    const [detailFlashcard, setDetailFlashcard] = useState(false);
    const [imgIndex, setImgIndex] = useState([]);

    useEffect(() => {
        const item = []
        data.forEach(i => {
            item.push((Math.ceil(Math.random() * 20)))
        });
        setImgIndex(item)
    }, [data]);

    return (
        <>
            <Head>
                <title>Flashcard</title>
            </Head>
            <SortAndFilter use={configUseSortAndFilter} setData={setData} listTopic={listTopic} setListTopic={setListTopic} />
            {detailFlashcard ?  <FlashcardDetail imgIndex={imgIndex} index={curDetailId} data={data[curDetailId]} /> : ''}
            <div className={styles.container}>
                <Flashcard imgIndex={imgIndex} setDetailFlashcard={setDetailFlashcard} setCurDetailId={setCurDetailId} data={data} setData={setData} listTopic={listTopic} />
            </div>
        </>
    )
}

export default Home;