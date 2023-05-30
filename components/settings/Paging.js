import { useState } from 'react';
import styles from '../../styles/Settings.module.scss';

function Paging() {
    const [quanlity, setQuanlity] = useState(localStorage.getItem('paging') ? localStorage.getItem('paging') : 20);

    const selectHandler = (e) => {
        if (e.target.value == quanlity)
            return;

        localStorage.setItem('paging', e.target.value);
        const elm = e.target.parentNode.parentNode.querySelectorAll(`input`);

        setQuanlity(e.target.value);

        if (e.target.checked)
            e.target.parentNode.classList.add(`${styles.selected}`);

        elm.forEach(item => {
            if (!item.checked)
                item.parentNode.classList.remove(`${styles.selected}`);
        });
    }

    return (
        <div className={styles.paging}>
            <div className={`${styles['paging-item']} ${quanlity == 12 ? styles.selected : ''}`}>
                12
                <input defaultChecked={quanlity == 12} onClick={(e) => selectHandler(e)} type='radio' name="quanlity" value="12" />
            </div>
            <div className={`${styles['paging-item']} ${quanlity == 16 ? styles.selected : ''}`}>
                16
                <input defaultChecked={quanlity == 16} onClick={(e) => selectHandler(e)} type='radio' name="quanlity" value="16" />
            </div>
            <div className={`${styles['paging-item']} ${quanlity == 20 ? styles.selected : ''}`}>
                20
                <input defaultChecked={quanlity == 20} onClick={(e) => selectHandler(e)} type='radio' name="quanlity" value="20" />
            </div>
            <div className={`${styles['paging-item']} ${quanlity == 30 ? styles.selected : ''}`}>
                30
                <input defaultChecked={quanlity == 30} onClick={(e) => selectHandler(e)} type='radio' name="quanlity" value="30" />
            </div>
        </div>
    );
}

export default Paging;