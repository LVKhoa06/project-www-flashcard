import Flashcard from "@/components/flashcard/Flashcard";
import Protector from "@/components/Protector";
import ModalCheck from "@/components/collection/ModalDeleteColelction";
import images from "assets";
import IconBin from "assets/icon-bin";
import IconTick from "assets/icon-tick";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from '../../styles/ListCollection.module.scss';
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";
import stylesF from '../../styles/Flashcard.module.scss';
import Loading from "@/components/loading/Loading";

function CollectionDetail() {
  const router = useRouter();
  const [listFlashcard, setListFlashcard] = useState([]);
  const [quantity, setQuantity] = useState(listFlashcard.length);
  const [collection, setCollection] = useState({});
  const [valueCollection, setValueCollection] = useState('');
  const [valueDescription, setValueDescription] = useState('');
  const [showCheck, setShowCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!router.query.id || !session?.user.nickname)
      return;

    const handler = async () => {
      const checkCollectionExist = await axios.get(`/api/collection/collection-check?id=${router.query.id}&username=${session?.user.nickname}`)

      if (!checkCollectionExist.data.check)
        return router.push('/404');

      const fetchListCollection = await axios.get(`/api/collection/collection-detail?id=${router.query.id}&username=${session?.user.nickname}`);
      setIsLoading(false);
      setListFlashcard(fetchListCollection.data.data1);
      setCollection(fetchListCollection.data.data2[0]);
    }

    handler();
  }, [router, session])

  useEffect(() => {
    setQuantity(listFlashcard.length);
  }, [listFlashcard])

  useEffect(() => {
    setValueCollection(collection.collection);
    setValueDescription(collection.description);
  }, [collection])

  const submitCollectionName = async (filed) => {
    await axios.post(
      `/api/collection/list-collection`,
      {
        id: collection.collection_id,
        filed: filed,
        value: filed === 'description' ? valueDescription : valueCollection
      },
      {
        "Content-Type": "application/json",
      }
    );
  }// submitCollectionName

  return (
    <Protector>
      <Head>
        <title>{collection?.collection} - Collection</title>
      </Head>
      <div className={styles.container}>
        {
          valueCollection ?
            <div className={styles.header}>
              <div className={styles['container-left']}>
                <img src={images.folder.src} />
              </div>
              <div className={styles['container-right']}>
                <div className={styles['collection-name']}>
                  <input
                    value={valueCollection}
                    onChange={(e) => setValueCollection(e.target.value)}
                  />
                  <span onClick={(e) => submitCollectionName('collection')}>
                    <IconTick />
                  </span>
                </div>
                <div className={styles['collection-info']}>
                  <span>{quantity} flashcard</span>
                  <span onClick={(e) => setShowCheck(true)} className={styles['delete-icon']}>
                    <IconBin className={styles['icon-bin']} viewBox='0 0 1024 1024' fill='#555' />
                  </span>
                </div>
                <div className={styles['collection-description']}>
                  <input
                    value={valueDescription}
                    placeholder='Description collection'
                    onChange={(e) => setValueDescription(e.target.value)}
                  />
                  <span onClick={(e) => submitCollectionName('description')}>
                    <IconTick />
                  </span>
                </div>
              </div>
            </div> :
            <Loading classNameBox={styles.header} quantity={1} />
        }

        {isLoading ?
          <Loading classNameContainer={styles.container} quantity={12} classNameBox={stylesF.flashcard} /> :
          listFlashcard.length ?
            <>
              <Flashcard setListFlashcard={setListFlashcard} listFlashcard={listFlashcard} setData={setListFlashcard} />
            </> :
            <div>
              <h1>Collection Empty</h1>
            </div>
        }
        {showCheck ? <ModalCheck id={collection.collection_id} setShowCheck={setShowCheck} /> : ''}
      </div>
    </Protector>
  );
}

export default CollectionDetail;
