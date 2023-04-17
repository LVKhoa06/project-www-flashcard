import axios from "axios";
import { useEffect, useState } from "react";
import styles from '../../styles/SortAndFilter.module.scss';
import Select from "../select";
import { useSession } from 'next-auth/react';

const CONST_SORT_CASE = {
    none: -1,
    alphabeticallyASC: 0,
    alphabeticallyDESC: 1,
    dateASC: 2,
    dateDESC: 3,
}

function SortAndFilter(props) {
    const {
        setData,
        setListTopic,
        use: config,
        setIsLoading,
        orderBy,
        direction,
        setSortConfig,
        topicId,
        setTopicId,
        value
    } = props
    const { none, alphabeticallyASC, alphabeticallyDESC, dateASC, dateDESC } = CONST_SORT_CASE
    const { data: session, status } = useSession();

    useEffect(() => {
        if (!session)
            return;

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
            if (session) {
                const data = await axios.get(`/api/flashcard/home?topic_id=${topicId}&orderBy=${orderBy}&direction=${direction}&date=${value}`);
                setData(data.data);
                setIsLoading(false);
            }
        }
        handler();
    }, [orderBy, direction, topicId, session]);

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
                    <Select onChange={setTopicId}>
                        <option value="">Theo chủ đề</option>
                    </Select>
                </div>
                : ''
            }
        </div>
    );
}

export default SortAndFilter;