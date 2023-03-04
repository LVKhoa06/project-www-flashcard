import Flashcard from "@/components/Flashcard";
import ModalCheck from "@/components/ModalDeleteColelction";
import SortAndFilter from "@/components/SortAndFilter";
import images from "assets";
import IconBin from "assets/icon-bin";
import IconTick from "assets/icon-tick";
import axios from "axios";
import { use, useEffect, useState } from "react";
import { getAllCollection, getFlashcardWithCollection } from "utils/mysql/mysql";
import styles from '../../styles/ListCollection.module.css'

export async function getStaticPaths() {
  const data = await getAllCollection();
  const paths = data.map((item) => {
    return {
      params: { id: item.collection_id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const fetch = await getFlashcardWithCollection(id);
  const fetch2 = await getAllCollection();

  const collection = fetch2.find(item => item.collection_id == id)

  const result = fetch.map(item => {
    return {
      ...item,
      creation_time: item.creation_time.toString()
    }
  })

  return { props: { result, collection } };
};

function CollectionDetail({ result, collection }) {
  const [data, setData] = useState(result);
  const [quantity, setQuantity] = useState(data.length);
  const [valueCollection, setValueCollection] = useState('');
  const [valueDescription, setValueDescription] = useState('');
  const [showCheck, setShowCheck] = useState(false);

  useEffect(() => {
    setQuantity(data.length);
  }, [data])

  const submitHandler = (e) => {
  }// submitHandler

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles['container-left']}>
          <img src={images.folder.src} />
        </div>
        <div className={styles['container-right']}>
          <div className={styles['collection-name']}>
            <input
              value={valueCollection}
              placeholder={collection.collection}
              onChange={(e) => setValueCollection(e.target.value)}
            />
            <span onClick={(e) => submitHandler(e)}>
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
              placeholder='Desctiprion collection'
              onChange={(e) => setValueDescription(e.target.value)}
            />
            <span onClick={(e) => submitHandler(e)}>
              <IconTick />
            </span>
          </div>
        </div>
      </div>
      {data.length ?
        <Flashcard data={data} setData={setData} /> :
        <div>
          <h1>Collection Empty</h1>
        </div>
      }
      {showCheck ? <ModalCheck id={collection.collection_id} setShowCheck={setShowCheck}/> : ''} 
    </div>
  );
}

export default CollectionDetail;
