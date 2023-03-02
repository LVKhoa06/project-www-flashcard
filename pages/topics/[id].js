import Flashcard from "@/components/Flashcard";
import { useState } from "react";
import { getAllTopic, getFlashcardWithCondition } from "utils/mysql/mysql";
import styles from '../../styles/ListTopic.module.css'

export async function getStaticPaths() {
  const data = await getAllTopic();

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
  const fetch = await getFlashcardWithCondition(id, 'topic_id');

  const result = fetch.map(item => {
    return {
      ...item,
      creation_time: item.creation_time.toString()
    }

  })

  return { props: { result } };
};

function TopicDetail({ result }) {
  const [data, setData] = useState(result);

  return (
    <div className={styles.container}>
      {data.length ?
        <Flashcard data={data} setData={setData} /> :
        <div>
          <h1>Topic Empty</h1>
        </div>
      }
    </div>
  );
}

export default TopicDetail;
