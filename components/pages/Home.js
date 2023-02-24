import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../../styles/Home.module.css'


const CONST_SORT_CASE = {
    none: -1,
    alphabeticallyASC: 0,
    alphabeticallyDESC: 1,
    dateASC: 2,
    dateDESC: 3,
}

function Home() {
    const { none, alphabeticallyASC, alphabeticallyDESC, dateASC, dateDESC } = CONST_SORT_CASE
    const [data, setData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ field: 'creation_time', orderBy: 'desc' });

    useEffect(() => {
        const handler = async () => {
            const data = await axios.get(`api/home?field=${sortConfig.field}&orderBy=${sortConfig.orderBy}`);
            setData(data.data);
        }
        handler();
    }, [sortConfig]);

    const deleteFlashcardHandler = async (id) => {
        axios.delete(`api/home?id=${id}`);

        setData(prev => {
            return prev.filter(item => {
                return item.id !== id;
            })
        });
    } // deleteFlashcardHandler

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

    const updateSortConfig = async (value) => {
        if (value == none) return;

        if (value == alphabeticallyASC)
            return setSortConfig({ field: 'term', orderBy: 'asc' });

        if (value == alphabeticallyDESC)
            return setSortConfig({ field: 'term', orderBy: 'desc' });

        if (value == dateASC)
            return setSortConfig({ field: 'creation_time', orderBy: 'asc' });

        if (value == dateDESC)
            return setSortConfig({ field: 'creation_time', orderBy: 'desc' });

    } // updateSortConfig

    return (
        <>
            <Head>
                <title>Flashcard</title>
            </Head>
            <div>
                <div>
                    <select
                        onChange={(e) => updateSortConfig(e.target.value)}
                    >
                        <option value={none}>Sắp xếp theo </option>
                        <option value={dateASC}>Mới nhất</option>
                        <option value={dateDESC}>Cũ nhất</option>
                        <option value={alphabeticallyASC}>{`A -> Z`}</option>
                        <option value={alphabeticallyDESC}>{`Z -> A`}</option>

                    </select>

                </div>
            </div>
            <div className={styles.container}>
                {data.map(item => {
                    const id = item.id;
                    return (
                        <div className={styles.flashcard} key={id}>
                            <h2
                                // disable warning when use contentEditable
                                suppressContentEditableWarning={true}
                                onKeyDown={(e) => updateFlashcardHandler(e, 'term', id)}
                                contentEditable
                            >
                                {item.term}
                            </h2>
                            <span
                                suppressContentEditableWarning={true}
                                onKeyDown={(e) => updateFlashcardHandler(e, 'descrption', id)}
                                contentEditable
                            >
                                {item.descrption}
                            </span>
                            <div onClick={() => deleteFlashcardHandler(id)}>x</div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}


export default Home;