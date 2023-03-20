import axios from "axios";
import { useEffect, useState } from "react";

function Select(props) {
    const { onChange, selected } = props;
    const [listTopic, setListTopic] = useState([]);

    useEffect(() => {
        const handler = async () => {
            const data1 = await axios.get("/api/topic/list-topic");
            setListTopic(data1.data);
        }
        handler();
    }, []);

    return (
        <>
            <select onChange={(e) => onChange(e.target.value)}>
                {props.children}
                {listTopic.map(item => {
                    return <option selected={item?.topic_id === selected ? true : false} key={item.topic_id} value={item.topic_id}>{item.topic}</option>
                })}
            </select>
        </>
    );
}

export default Select;