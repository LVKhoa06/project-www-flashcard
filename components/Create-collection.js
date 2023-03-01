import axios from 'axios';
import { useState } from 'react';
import styles from '../styles/Collection.module.css'

function CreateCollection({ }) {
    const [value, setValue] = useState('');
    const submitHandler = async (e) => {
        e.preventDefault();
        await axios.post(
            "/api/collection",
            {
                topic: value
            },
            {
                "Content-Type": "application/json",
            }
        );
    }


    return (
        <>
            <div className={styles.container}>
                <div className={styles.modal}>
                    <span>x</span>
                    <div>
                        <h2>Create Topic</h2>
                    </div>
                    <form className={styles.form}>
                        <input onChange={(e) => setValue(e.target.value)} value={value} placeholder='Topic' />
                        <button onClick={(e) => submitHandler(e)}>Ok</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateCollection;