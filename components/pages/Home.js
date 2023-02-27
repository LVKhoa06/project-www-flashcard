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
    withLife: 4,
    withIT: 5,
    withEconomy: 6,
    withFood: 7,
}

function Home() {
    const { none, alphabeticallyASC, alphabeticallyDESC, dateASC, dateDESC, withEconomy, withFood, withIT, withLife } = CONST_SORT_CASE
    const [data, setData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ field: 'creation_time', orderBy: 'desc', type:''});
    const {field, orderBy, type} = sortConfig;

    useEffect(() => {
        const handler = async () => {
            const data = await axios.get(`api/home?field=${field}&orderBy=${orderBy}&type=${type}`);
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
                    value,
                },
                {
                    "Content-Type": "application/json",
                }
            )
        }
    } // updateFlashcardHandler

    const updateSortConfig = async (type, value) => {
        if (value == none) return;

        if (value == alphabeticallyASC)
            return setSortConfig({ field: 'term', orderBy: 'asc', type: 'sort' });

        if (value == alphabeticallyDESC)
            return setSortConfig({ field: 'term', orderBy: 'desc', type: 'sort' });

        if (value == dateASC)
            return setSortConfig({ field: 'creation_time', orderBy: 'asc', type: 'sort' });

        if (value == dateDESC)
            return setSortConfig({ field: 'creation_time', orderBy: 'desc', type: 'sort' });


        if (value == withEconomy)
            return setSortConfig({ field: '3', orderBy: '', type: 'topic' });

        if (value == withFood)
            return setSortConfig({ field: '2', orderBy: '', type: 'topic' });

        if (value == withIT)
            return setSortConfig({ field: '1', orderBy: '', type: 'topic' });

        if (value == withLife)
            return setSortConfig({ field: '4', orderBy: '', type: 'topic' });

    } // updateSortConfig

    return (
        <>
            <Head>
                <title>Flashcard</title>
            </Head>
            <div className={styles.filter}>
            <div>
                <select
                    onChange={(e) => updateSortConfig('sort', e.target.value)}
                >
                    <option value={none}>Sắp xếp theo </option>
                    <option value={dateASC}>Mới nhất</option>
                    <option value={dateDESC}>Cũ nhất</option>
                    <option value={alphabeticallyASC}>{`A -> Z`}</option>
                    <option value={alphabeticallyDESC}>{`Z -> A`}</option>

                </select>

            </div>
            <div>
                <select
                    onChange={(e) => updateSortConfig('topic', e.target.value)}
                >
                    <option value={none}>Theo chủ đề</option>
                    <option value={withLife}>Cuộc sống</option>
                    <option value={withIT}>IT</option>
                    <option value={withEconomy}>Kinh tế</option>
                    <option value={withFood}>Thực phẩm</option>

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