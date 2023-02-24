import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../../styles/Home.module.css'

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const handler = async () => {
            const data = await axios.get('api/home');
            setData(data.data);
        }
        handler();
    }, [])

    const deleteHandler = async (id) => {
        axios.delete(`api/home?id=${id}`);

        setData(prev => {
            return prev.filter(item => {
                return item.id !== id;
            })
        });
    } // deleteHandler

    const updateFlashcardHandler = async (e, field, id) => {
        if (e.key === 'Enter') {
            const value = e.target.innerText;
            e.preventDefault();

            await axios.patch(
                'api/home',
                {
                    id,
                    field,
                    value
                },
                {
                    "Content-Type": "application/json",
                }
            )
        }
        
    } // updateFlashcardHandler

    return (
        <>
            <Head>
                <title>Create Next App</title>
            </Head>
            <div className={styles.container}>
                {data.map(item => {
                    const id = item.id;
                    return (
                        <div className={styles.flashcard} key={id}>
                            <h2
                                onKeyDown={(e) => updateFlashcardHandler(e, 'term', id)}
                                contentEditable
                            >{item.term}
                            </h2>
                            <span
                                onKeyDown={(e) => updateFlashcardHandler(e, 'descrption', id)}
                                contentEditable
                            >{item.descrption}
                            </span>
                            <div onClick={() => deleteHandler(id)}>x</div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}


export default Home;