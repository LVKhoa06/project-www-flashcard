import Head from "next/head";
import {  useEffect, useState } from "react";
import { flashcard_getAFlashcard, flashcard_getWithCondition } from "utils/mysql/mysql";
import styles from '../../styles/ListCollection.module.css'

export async function getStaticPaths() {
  const data = await flashcard_getWithCondition();
  const paths = data.map((item) => {
    return {
      params: { id: item.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const fetch = await flashcard_getAFlashcard(id);


  const result = fetch.map(item => {
    return {
      ...item,
      creation_time: item.creation_time.toString()
    }
  })

  return { props: { result } };
};

function FlashcardDetail({ result }) {
  const [data, setData] = useState(result);
  
  useEffect(() => {
    console.log(data);
  }, [data])

  return (
    <>
      <Head>
        <title>{''} - Collection</title>
      </Head>
      <div className={styles.container}>

      </div>
    </>
  );
}

export default FlashcardDetail;
