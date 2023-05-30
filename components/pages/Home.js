import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.scss';
import stylesF from '../../styles/Flashcard.module.scss';
import Flashcard from '../flashcard/Flashcard';
import SortAndFilter from '../sort_and_filter/SortAndFilter';
import { useSession } from 'next-auth/react';
import Loading from '../loading/Loading';
import FilterWidthDate from '../sort_and_filter/FilterWidthDate';

function Home() {
    const configUseSortAndFilter = { sort: true, filter: true }
    const [sortConfig, setSortConfig] = useState({ orderBy: 'creation_time', direction: 'desc' });
    const { orderBy, direction } = sortConfig;
    const [data, setData] = useState([]);
    const [listTopic, setListTopic] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [topicId, setTopicId] = useState('');
    const [value, setValue] = useState('');

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
            <div className={styles.sort}>
                <SortAndFilter
                    setIsLoading={setIsLoading}
                    use={configUseSortAndFilter}
                    setData={setData}
                    listTopic={listTopic}
                    setListTopic={setListTopic}
                    setSortConfig={setSortConfig}
                    orderBy={orderBy}
                    direction={direction}
                    topicId={topicId}
                    value={value}
                    setTopicId={setTopicId}
                />
                <FilterWidthDate
                    setIsLoading={setIsLoading}
                    orderBy={orderBy}
                    direction={direction}
                    topicId={topicId}
                    setData={setData}
                    value={value}
                    setValue={setValue}
                />
            </div>
            {
                isLoading ?
                    <Loading classNameContainer={styles.container} quantity={16} classNameBox={stylesF.flashcard} />
                    :
                    data.length ?
                        <div className={styles.container}>
                            <Flashcard listFlashcard={data} setListFlashcard={setData} />
                        </div> :
                        <div className={styles.container}>
                            <h1>No flashcards</h1>
                        </div>
            }
        </>
    )
}

export default Home;