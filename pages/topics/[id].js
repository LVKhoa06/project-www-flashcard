import Flashcard from "@/components/flashcard/Flashcard";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from '../../styles/ListTopic.module.scss'
import Protector from "@/components/Protector";
import { useRouter } from "next/router";
import axios from "axios";
import Loading from "@/components/loading/Loading";
import stylesF from '../../styles/Flashcard.module.scss';

function TopicDetail() {
  const router = useRouter();
  const [listFlashcard, setListFlashcard] = useState([]);
  const [topic, setTopic] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!router.query.id)
      return;

    const handler = async () => {
      const fetch = await axios.get(`/api/topic/topic-check?id=${router.query.id}`);
      const checkTopicExist = fetch.data[0].topic_check

      if (!checkTopicExist)
        return router.push('/404');

      const fetchListTopic = await axios.get(`/api/topic/topic-detail?id=${router.query.id}`);

      setIsLoading(false);
      setListFlashcard(fetchListTopic.data.data1);
      setTopic(fetchListTopic.data.data2[0]);
    }

    handler();
  }, [router]);

  return (
    <Protector>
      <Head>
        <title>{topic.topic} - Topic</title>
      </Head>
      {isLoading ?
        <Loading classNameContainer={styles.container} quantity={16} classNameBox={stylesF.flashcard} /> :
        listFlashcard.length ?
          <div className={styles.container}>
            <Flashcard listFlashcard={listFlashcard} setListFlashcard={setListFlashcard} />
          </div> :
          <div className={styles.container}>
            <h1>Topic Empty.</h1>
          </div>
      }
    </Protector>
  );
}

export default TopicDetail;
