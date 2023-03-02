import axios from "axios";
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
  const data = await getFlashcardWithCondition(id, 'collection_id');

  return { props: { data: data } };
};

function TopicDetail({ data }) {

  return (
    <div className={styles.container}>
      {data.length ? 
      <Flashcard data={data} setData={setData}/> :
      <h1>Collection Empty</h1>
        }
    </div>
  );
}

export default TopicDetail;
