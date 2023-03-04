import Flashcard from "@/components/Flashcard";
import SortAndFilter from "@/components/SortAndFilter";
import images from "assets";
import { useState } from "react";
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
  console.log(images.folder.src);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <div>
            <img src={images.folder.src}/>
          </div>
          <div>
            <input placeholder={'Title'}/>
          </div>
        </div>
        <div></div>
      </div>
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
