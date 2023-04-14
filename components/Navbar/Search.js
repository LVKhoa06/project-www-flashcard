import IconSearch from 'assets/icon-search';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useDebounce from 'utils/useDebounce';
import styles from '../../styles/Search.module.scss';
import FlashcardDetail from '../flashcard/Detail';
import { useSession } from 'next-auth/react';

function Search() {
    const [value, setValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [flashcard, setFlashcard] = useState({});
    const [show, setShow] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const debouncedValue = useDebounce(value, 1500);
    const { data: session, status } = useSession();

    useEffect(() => {
        const closeElm = () => setIsFocus(false);
        document.addEventListener('click', closeElm);

        return () => document.removeEventListener('click', closeElm)
    }, [])

    useEffect(() => {
        if (!session)
            return;

        const handler = async () => {
            if (debouncedValue.length) {
                const data = await axios.get(`/api/flashcard/search?key=${debouncedValue}`);
                setSearchResult(data.data);
                setIsLoading(false);
            }
        }
        handler();
    }, [debouncedValue])

    const submitHandler = async () => {
        if (!session)
            return;

        if (value.length)
            router.push(`/search?keyword=${value}`)

        setIsFocus(false);
    } // submitHandler

    return (
        <>
            <div onClick={(e) => e.stopPropagation()} className={styles.container}>
                <div className={styles.form} method="get" action="">
                    <input
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value)
                            setSearchResult([])
                            setIsLoading(true);
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
                    className={`${styles.container_result} ${value.length && isFocus ? 'show' : ''} ${value.length && isFocus && !searchResult.length ? 'flicker' : ''}`}
                >
                    {isLoading ?
                        <p>Looking for flashcards matching ' {value} '</p> :
                        searchResult.length ?
                            searchResult.map(item => {
                                return (
                                    <div onClick={() => {
                                        setFlashcard(item);
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
                            }) :
                            <p>No flashcards found matching ' {value} '</p>
                    }
                    {show && flashcard && <FlashcardDetail show={show} setShow={setShow} data={flashcard} />}
                </div>
            </div>

        </>
    );
}

export default Search;