import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from 'next/head';
import Flashcard from '../flashcard/Flashcard';
import styles from '../../styles/Home.module.scss';
import SortAndFilter from '../sort_and_filter/SortAndFilter';

function Search() {
    const router = useRouter();
    const configUseSortAndFilter = { sort: true, filter: true }
    const [keyword, setKeyword] = useState(router.query.keyword);
    const [data, setData] = useState([]);
    const [listTopic, setListTopic] = useState([]);

    useEffect(() => {
        const handler = async () => {
            const fetch = await axios.get(`api/search/search?keyword=${keyword}`)
            setData(fetch.data);
        }
        handler();
    }, [keyword])

    useEffect(() => {
        setKeyword(router.query.keyword)
    }, [router.asPath])

    return (
        <>
            <Head>
                <title>Flashcard</title>
            </Head>
            <div className={styles.container}>
                <Flashcard data={data} setData={setData} />
            </div>
        </>
    )
}

export default Search;