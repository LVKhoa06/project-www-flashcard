import IconBin from 'assets/icon-bin';
import IconRecover from 'assets/icon-recover';
import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../../styles/Bin.module.scss'
import Notification from '../notification/Notification';
import ModalCheck from './CheckDeleting';
import { useSession } from 'next-auth/react';
import Loading from '../loading/Loading';

function Bin() {
    const { data: session, status } = useSession();
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [curId, setCurId] = useState();
    const [notificationConfig, setNotificationConfig] = useState({
        show: false,
        type: '',
        message: ''
    })

    useEffect(() => {
        if (!session)
            return;

        const handler = async () => {
            const fetch = await axios.get('/api/bin/bin');
            setData(fetch.data);
            setIsLoading(false);
        }
        handler();
    }, [])

    const recoverhandler = async (id) => {
        await axios.patch(
            `/api/bin/bin`,
            {
                id
            },
            {
                "Content-Type": "application/json",
            }
        );

        setData(prev => prev.filter(item => item.id !== id));
        setCurId(id);

        setNotificationConfig({
            type: 'success',
            show: !notificationConfig.show,
            message: 'Recover flashcard successfull'
        })
    }// recoverhandler



    return (
        <>
            <Notification config={notificationConfig} />
            {show && <ModalCheck setShow={setShow} setData={setData} id={curId} notificationConfig={notificationConfig} setNotificationConfig={setNotificationConfig} />}
            <Head>
                <title>Flashcard Bin</title>
            </Head>
            {isLoading ?
                <Loading classNameContainer={styles.container} quantity={6} classNameBox={styles.item} /> :
                data.length ?
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
                                            <div title='Recover' onClick={() => {
                                                recoverhandler(item.id)
                                            }
                                            } className={styles['icon-recover']}>
                                                <IconRecover fill="#555" viewBox="0 0 64 64" version="1.1" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" />
                                            </div>
                                            <div title='Remove' onClick={() => {
                                                setShow(true);
                                                setCurId(item.id);
                                            }
                                            } className={styles['icon-bin']}>
                                                <IconBin viewBox='0 0 1024 1024' fill='#555' />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div> :
                    <div className={styles.container}>
                        <h1>Empty trash can.</h1>
                    </div>
            }
        </>

    );
}

export default Bin;