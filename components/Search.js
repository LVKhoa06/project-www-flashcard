import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../styles/Search.module.css';

function Search() {
    const [value, setValue] = useState('');
    const [result, setResult] = useState([]);
    const [listTopic, setListTopic] = useState([]);
    const [show, setShow] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (value) {
            const data = await axios.get(`/api/search?key=${value}`);
            const data2 = await axios.get(`/api/create`);
            setResult(data.data);
            setListTopic(data2.data);
        }
    } // submitHandler

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
                <button onClick={(e) =>{
                    setShow(true)
                    submitHandler(e)
                }} className={styles.button} type="submit">Ok</button>
            </form>
            <div className={`${styles.container_result} ${result.length && show ? styles.show : ''}`}>
                <div onClick={() => setShow(false)} className={styles.close}>x</div>
                {
                    result.map(item => {
                        const topicName = listTopic[item.topic_id];
                        return (
                            <div className={styles.search_item} key={item.id}>
                                <div className={styles.left_item}>
                                    <h3>{item.term}</h3>
                                    <span>{item.descrption}</span>
                                </div>
                                <div className={styles.right_item}>
                                    <span>{typeof topicName === 'string' ? listTopic[item.topic_id] : ''}</span>
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