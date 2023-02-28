import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../styles/Search.module.css';

function Search() {
    const [value, setValue] = useState('');
    const [result, setResult] = useState([]);
    const [listTopic, setListTopic] = useState([]);



    const submitHandler = async (e) => {
        e.preventDefault();

        if (value) {
            const data = await axios.get(`/api/search?key=${value}`);
            const data2 = await axios.get(`/api/create`);
            setResult(data.data);
            setListTopic(data2.data);
        }

    } // submitHandler

    const foo = (arr) => {


    }

    useEffect(() => {
        if (listTopic.length) {
            setListTopic((prev => {
                let result = {};
                prev.forEach(elm => {
                    result = {
                        ...result,
                        [elm.topic_id]: elm.topic
                    }
                });
                return result;
            }))
        }
    }, [listTopic])

    return (
        <div className={styles.container}>
            <form className={styles.form} method="get" action="">
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className={styles.input}
                    type="text"
                    placeholder="Search"
                />
                <button onClick={(e) => submitHandler(e)} className={styles.button} type="submit">                        </button>
            </form>
            <div className={`${styles.container_result} ${result.length ? styles.show : ''}`}>
                {
                    result.map(item => {
                        const topicName = listTopic[item.topic_id];
                        return (
                            <div key={item.id}>
                                <div>
                                    <h3>{item.term}</h3>
                                    <span>{item.descrption}</span>

                                </div>
                                <div>
                                    <span>{}</span>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
        </div>

    );
}

export default Search;