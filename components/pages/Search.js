import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from 'next/head';
import Flashcard from '../flashcard/Flashcard';
import styles from '../../styles/Home.module.scss';
import Loading from "../loading/Loading";
import stylesF from '../../styles/Flashcard.module.scss'

function Search() {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const { keyword } = router.query;

        if (!keyword)
            return;

        const handler = async () => {
            setIsLoading(true);
            const fetch = await axios.get(`/api/search/search?keyword=${keyword}`)
            setData(fetch.data);
            setIsLoading(false);
        }

        handler();
    }, [router])

    useEffect(() => {
        console.log(isLoading);
    }, [isLoading])

    return (
        <>
            <Head>
                <title>Search Result</title>
            </Head>
            {isLoading ?
                <Loading classNameContainer={styles.container_search} quantity={16} classNameBox={stylesF.flashcard}/> :
                data.length ?
                    <div className={styles.container_search}>
                        <Flashcard listFlashcard={data} setData={setData} />
                    </div> :
                    <div className={styles.container_search}>
                        <h1>No flashcards found matching ' a '</h1>
                    </div>
            }

        </>
    )
}

export default Search;