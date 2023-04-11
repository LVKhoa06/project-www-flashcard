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

function CollectionDetail() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(data.length);
  const [collection, setCollection] = useState({});
  const [valueCollection, setValueCollection] = useState('');
  const [valueDescription, setValueDescription] = useState('');
  const [showCheck, setShowCheck] = useState(false);

  useEffect(() => {
    if (!router.query.id)
      return;

    const handler = async () => {
      const fetch1 = await axios.get(`/api/collection/collection-detail?id=${router.query.id}`);

      if (!fetch1.data.data1.length || !fetch1.data.data2.length) {
        return router.push('/404');
      }

      setData(fetch1.data.data1);
      setCollection(fetch1.data.data2[0]);
    }

    handler();
  }, [router])

  useEffect(() => {
    setQuantity(data.length);
  }, [data])

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
        </div>
        {data.length ?
          <>
            <Flashcard data={data} setData={setData} />
          </>
          :
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
