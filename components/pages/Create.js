import { useEffect, useState } from "react";
import axios from "axios";
import formatDateWithLocale from "utils/format-date.";
import Head from "next/head";


function Create() {
    const [listTopic, setListTopic] = useState([]);
    const [topicId, setTopicId] = useState(-1);
    const [term, setTerm] = useState('');
    const [description, setDiscription] = useState('');

    useEffect(() => {
        const handler = async () => {
            const data = await axios.get("/api/list-topic");
            setListTopic(data.data);
        }
        handler();
    }, []);

    const date = formatDateWithLocale({
        format: "YYYY-MM-DD",
        input: new Date(),
    });

    async function handlerCreate(e) {
        e.preventDefault();
        await axios.post(
            "/api/create",
            {
                topic_id: topicId,
                term,
                description,
                date
            },
            {
                "Content-Type": "application/json",
            }
        );
        setTerm('');
        setDiscription('');
    } // handlerCreate

    return (
        <>
            <Head>
                <title>Create Flashcard</title>
            </Head>
            <form>
                <div>
                    <select
                        onChange={(e) => setTopicId(e.target.value)}
                    >
                        <option value={-1}>Khác</option>

                        {listTopic.map(item => {
                            console.log(item.topic_id)
                            return item.topic_id > 0 ? <option key={item.topic_id} value={item.topic_id}>{item.topic}</option> : ''

                        })}
                    </select>

                </div>
                <input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Thuật ngữ" />
                <input value={description} onChange={(e) => setDiscription(e.target.value)} placeholder="Giải thích" />

                <button onClick={(e) => handlerCreate(e)}>submit</button>
            </form>
        </>

    );
}

export default Create;