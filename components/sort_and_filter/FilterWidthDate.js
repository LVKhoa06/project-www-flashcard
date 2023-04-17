import axios from "axios";
import { useEffect, useState } from "react";
import styles from '../../styles/FilterWidthDate.module.scss';

function FilterWidthDate(props) {
    const { setData, topicId, direction, orderBy, value, setValue } = props

    useEffect(() => {
        if (!value)
            return;
        const handler = async () => {
            const data = await axios.get(`/api/flashcard/home?topic_id=${topicId}&orderBy=${orderBy}&direction=${direction}&date=${value}`);
            setData(data.data);
        }

        handler();
    }, [value]);

    const onChangeHandler = async (e) => {
        const date = e.target.value;
        setValue(date);

        if (!date) {
            const handler = async () => {
                const data = await axios.get(`/api/flashcard/home?topic_id=${topicId}&orderBy=${orderBy}&direction=${direction}`);
                setData(data.data);
            }
            handler();

        }
    } // onChangeHandler

    return (
        <div className={styles.container}>
            <input
                value={value}
                type="date"
                onChange={(e) => onChangeHandler(e)}
            />
        </div>
    );
}

export default FilterWidthDate;

// clear date