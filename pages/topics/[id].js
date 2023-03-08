import FlashcardDetail from "@/components/flashcard/Detail";
import Flashcard from "@/components/flashcard/Flashcard";
import Head from "next/head";
import { useEffect, useState } from "react";
import { topic_getAll, flashcard_getWithCondition } from "utils/mysql/mysql";
import styles from '../../styles/ListTopic.module.css'

export async function getStaticPaths() {
  const data = await topic_getAll();

  const paths = data.map((item) => {
    return {
      params: { id: item.topic_id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const fetch = await flashcard_getWithCondition(id, 'topic_id');
  const fetch2 = await topic_getAll();

  const topic = fetch2.find(item => item.topic_id == id)

  const result = fetch.map(item => {
    return {
      ...item,
      creation_time: item.creation_time.toString()
    }

  })

  return { props: { result, topic } };
};

function TopicDetail({ result, topic }) {
  const [data, setData] = useState(result);
  const [imgIndex, setImgIndex] = useState([]);
  const [curDetailId, setCurDetailId] = useState(0);
  const [detailFlashcard, setDetailFlashcard] = useState(false);

  useEffect(() => {
    const item = []
    data.forEach(i => {
      item.push((Math.ceil(Math.random() * 20)))
    });
    setImgIndex(item)
  }, [data]);

  return (
    <>
      <Head>
        <title>{topic.topic} - Topic</title>
      </Head>
      <div className={styles.container}>
        {data.length ?
          <>
            {detailFlashcard ? <FlashcardDetail imgIndex={imgIndex} index={curDetailId} data={data[curDetailId]} /> : ''}
            <Flashcard imgIndex={imgIndex} setDetailFlashcard={setDetailFlashcard} setCurDetailId={setCurDetailId} data={data} setData={setData} />
          </> :
          <div>
            <h1>Topic Empty</h1>
          </div>
        }
      </div>
    </>
  );
}

export default TopicDetail;
