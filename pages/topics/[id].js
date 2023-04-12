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
      const fetch = await axios.get(`/api/topic/topic-check?id=${router.query.id}`);
      const checkTopicExist = fetch.data[0].topic_check
      
      if (!checkTopicExist) 
        return router.push('/404');
      
      const fetchListTopic = await axios.get(`/api/topic/topic-detail?id=${router.query.id}`);


      setData(fetchListTopic.data.data1);
      setTopic(fetchListTopic.data.data2[0]);
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
