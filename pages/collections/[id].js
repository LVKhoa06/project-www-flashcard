import Flashcard from "@/components/Flashcard";
import SortAndFilter from "@/components/SortAndFilter";
import { useState } from "react";
import { getAllCollection, getFlashcardWithCondition } from "utils/mysql/mysql";
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
  const fetch = await getFlashcardWithCondition(id, 'collection_id');

  const result = fetch.map(item => {
    return {
      ...item,
      creation_time: item.creation_time.toString()
    }
  })

  return { props: { result } };
};

function CollectionDetail({ result }) {
  const [data, setData] = useState(result);

  return (
    <div className={styles.container}>
      {data.length ?
        <Flashcard data={data} setData={setData} /> :
        <div>
          <h1>Collection Empty</h1>
        </div>
      }
    </div>
  );
}

export default CollectionDetail;
