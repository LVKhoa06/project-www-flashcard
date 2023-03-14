import IconSearch from 'assets/icon-search';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import useDebounce from 'utils/useDebounce';
import styles from '../../styles/Search.module.scss';
import FlashcardDetail from '../flashcard/Detail';

function Search() {
    const [value, setValue] = useState('');
    const [result, setResult] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [show, setShow] = useState(false);
    const [data, setData] = useState({});
    const router = useRouter();
    // const debouncedValue = useDebounce(result, 300); // Delay 

    useEffect(() => {
        const closeElm = () => setIsFocus(false);

        document.addEventListener('click', closeElm);

        return () => document.removeEventListener('click', closeElm)
    }, [])


    const submitHandler = async () => {
        if (value.length)
            router.push(`/search?keyword=${value}`)

        setIsFocus(false);
    } // submitHandler

    const searchHandler = async (v) => {
        if (v) {
            const data = await axios.get(`/api/flashcard/search?key=${v}`);
            setResult(data.data);
        } else setResult([])
    } // searchHandler


    return (
        <>
            <div onClick={(e) => e.stopPropagation()} className={styles.container}>
                <div className={styles.form} method="get" action="">
                    <input
                        value={value}
                        onChange={(e) => {
                            searchHandler(e.target.value)
                            setValue(e.target.value)
                        }}

                        className={styles.input}
                        type="text"
                        placeholder="Search"
                        onFocus={() => setIsFocus(true)}
                    />
                    <button onClick={(e) => {
                        submitHandler(e)
                    }} className={styles.button} type="submit"><IconSearch /></button>
                </div>
                <div
                    className={`${styles.container_result} ${value.length && isFocus && result.length ? 'show' : ''}`}
                >
                    {result.length ?
                        result.map(item => {
                            return (
                                <div onClick={() => {
                                    setData(item);
                                    setShow(true);
                                }} className={styles.search_item} key={item.id}>
                                    <div className={styles.left_item}>
                                        <h3>{item.term}</h3>
                                        <span>{item.description}</span>
                                    </div>
                                    <div className={styles.right_item}>
                                        <span>{item.topic}</span>
                                    </div>
                                </div>
                            )
                        }) : <p>Loading...</p>
                    }
                    {show && data && <FlashcardDetail show={show} setShow={setShow} data={data} />}
                </div>

                {useDebounce(
                    value.length && isFocus && !result.length &&
                    <div className={`${styles.container_result} show ${styles['not-found']}`}>
                        <h2>No flashcards found matching " {value} "</h2>
                    </div>
                    , 1500) ||
                    <></>}
            </div>

        </>
    );
}

export default Search;