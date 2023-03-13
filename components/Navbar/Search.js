import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import useDebounce from 'utils/useDebounce';
import styles from '../../styles/Search.module.scss';

function Search() {
    const [value, setValue] = useState('');
    const [result, setResult] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    // const debouncedValue = useDebounce(result, 300); // Delay 

    const submitHandler = async (e) => {
        // page search result
        if (value) {
            const data = await axios.get(`/api/flashcard/search?key=${value}`);
            setResult(data.data);
        }
    } // submitHandler

    const searchHandler = async (v) => {
        if (v) {
            const data = await axios.get(`/api/flashcard/search?key=${v}`);
            setResult(data.data);
        } else setResult([])
    } // searchHandler


    return (
        <>
            <div className={styles.container}>
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
                        onBlur={() => {
                            setIsFocus(false);
                        }}
                    />
                    <button onClick={(e) => {
                        setIsFocus(true);
                        submitHandler(e)
                    }} className={styles.button} type="submit">Ok</button>
                </div>
                <div
                    className={`${styles.container_result} ${value.length && isFocus ? styles.show : ''}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {
                        result.map(item => {
                            return (
                                <div className={styles.search_item} key={item.id}>
                                    <div className={styles.left_item}>
                                        <h3>{item.term}</h3>
                                        <span>{item.description}</span>
                                    </div>
                                    <div className={styles.right_item}>
                                        <span>{item.topic}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </>
    );
}

export default Search;