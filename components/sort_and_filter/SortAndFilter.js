import axios from "axios";
import { useEffect, useState } from "react";
import styles from '../../styles/SortAndFilter.module.scss';
import Select from "../select";

const CONST_SORT_CASE = {
    none: -1,
    alphabeticallyASC: 0,
    alphabeticallyDESC: 1,
    dateASC: 2,
    dateDESC: 3,
}

function SortAndFilter(props) {
    const { setData, setListTopic, listTopic, use: config } = props
    const { none, alphabeticallyASC, alphabeticallyDESC, dateASC, dateDESC } = CONST_SORT_CASE
    const [sortConfig, setSortConfig] = useState({ orderBy: 'creation_time', direction: 'desc' });
    const { orderBy, direction } = sortConfig;
    const [topicId, setTopicId] = useState('');

    useEffect(() => {
        if (config.filter) {
            const handler = async () => {
                const data = await axios.get("/api/topic/list-topic");
                setListTopic(data.data.filter(item => item.topic_id !== -1));
            }
            handler();
        }
    }, []);

    useEffect(() => {
        const handler = async () => {
            const data = await axios.get(`api/flashcard/home?topic_id=${topicId}&orderBy=${orderBy}&direction=${direction}`);
            setData(data.data);
        }
        handler();
    }, [sortConfig, topicId]);

    const updateSortConfig = async (value) => {
        if (value == none) return;

        if (value == alphabeticallyASC)
            return setSortConfig({ orderBy: 'term', direction: 'asc' });

        if (value == alphabeticallyDESC)
            return setSortConfig({ orderBy: 'term', direction: 'desc' });

        if (value == dateASC)
            return setSortConfig({ orderBy: 'creation_time', direction: 'asc' });

        if (value == dateDESC)
            return setSortConfig({ orderBy: 'creation_time', direction: 'desc' });
    } // updateSortConfig

    return (
        <div className={styles.filter}>
            {config.sort ?
                <div>
                    <select
                        onChange={(e) => updateSortConfig(e.target.value)}
                    >
                        <option value={none}>Sắp xếp theo </option>
                        <option value={dateASC}>Mới nhất</option>
                        <option value={dateDESC}>Cũ nhất</option>
                        <option value={alphabeticallyASC}>{`A -> Z`}</option>
                        <option value={alphabeticallyDESC}>{`Z -> A`}</option>
                    </select>
                </div>
                : ''}
            {config.filter ?
                <div>
                    <Select func={setTopicId} data={listTopic}>
                        <option value="">Theo chủ đề</option>
                        <option value={-1}>Khác</option>
                    </Select>
                </div>
                : ''
            }
        </div>
    );
}

export default SortAndFilter;