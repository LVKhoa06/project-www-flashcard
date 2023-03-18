import IconBin from 'assets/icon-bin';
import IconRecover from 'assets/icon-recover';
import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../../styles/Bin.module.scss'

function Bin() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const handler = async () => {
            const fetch = await axios.get('api/bin/bin');
            setData(fetch.data);
        }
        handler();
    }, [])

    const recoverhandler = async (id) => {
        await axios.delete(`api/bin/bin?id=${id}`);

        setData(prev => prev.filter(item => item.id !== id))
    }// recoverhandler

    const removeHandler = async (id) => {
        await axios.patch(
            `api/bin/bin`,
            {
                id
            },
            {
                "Content-Type": "application/json",
            }
        );

        setData(prev => prev.filter(item => item.id !== id))
    }// recoverhandler

    return (
        <>
            <Head>
                <title>Flashcard Bin</title>
            </Head>
            <div className={styles.container}>
                {
                    data.map(item => {
                        return (
                            <div className={styles.item}>
                                <div className={styles['container-content']}>
                                    <h2>{item.term}</h2>
                                    <p>{item.description}</p>
                                </div>
                                <div className={styles['container-icon']}>
                                    <div title='Recover' onClick={() => recoverhandler(item.id)} className={styles['icon-recover']}>
                                        <IconRecover fill="#555" viewBox="0 0 64 64" version="1.1" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" />
                                    </div>
                                    <div title='Remove' onClick={() => removeHandler(item.id)} className={styles['icon-bin']}>
                                        <IconBin viewBox='0 0 1024 1024' fill='#555' />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>

    );
}

export default Bin;