import Flashcard from "@/components/flashcard/Flashcard";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from '../../styles/ListTopic.module.scss'
import Protector from "@/components/Protector";
import { useRouter } from "next/router";
import axios from "axios";

function TopicDetail() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [topic, setTopic] = useState({});

  useEffect(() => {
    if (!router.query.id)
      return;

    const handler = async () => {
      const fetch1 = await axios.get(`/api/topic/topic-detail?id=${router.query.id}`);

      if (!fetch1.data.data1.length || !fetch1.data.data2.length) {
        return router.push('/404');
      }

      setData(fetch1.data.data1);
      setTopic(fetch1.data.data2[0]);
    }

    handler();
  }, [router]);


  return (
    <Protector>
      <Head>
        <title>{topic.topic} - Topic</title>
      </Head>
      <div className={styles.container}>
        <Flashcard data={data} setData={setData} />
      </div>
    </Protector>
  );
}

export default TopicDetail;
