import axios from "axios";
import { useEffect, useState } from "react";
import styles from '../../styles/FilterWidthDate.module.scss';

function FilterWidthDate({setData}) {
    const [value, setValue] = useState('');

    useEffect(() => {
        if (!value)
            return;
        const handler = async () => {
            const fetch = await axios.get(`/api/flashcard/filter-date?date=${value}`)
        
            setData(fetch.data)
        }

        handler();
    }, [value]);

    return (
        <div className={styles.container}>
            <input
                value={value}
                type="date"
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}

export default FilterWidthDate;