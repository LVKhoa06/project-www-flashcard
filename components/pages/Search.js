import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from 'next/head';
import Flashcard from '../flashcard/Flashcard';
import styles from '../../styles/Home.module.scss';

function Search() {
    const router = useRouter();
    const [data, setData] = useState([]);

    useEffect(() => {
        const { keyword } = router.query;

        if (!keyword)
            return;

        const handler = async () => {
            const fetch = await axios.get(`/api/search/search?keyword=${keyword}`)
            setData(fetch.data);
        }

        handler();
    }, [router])

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