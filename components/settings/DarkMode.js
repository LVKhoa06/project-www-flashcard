import { useState, useEffect } from 'react';
import styles from '../../styles/DarkMode.module.scss';
function DarkMode({ onMouseDown }) {
    const [darkMode, setDarkMode] = useState(
        typeof window === "undefined" ? '' :
            window.localStorage.getItem('theme') === 'dark'
    );

    useEffect(() => {
        const html = window.document.getElementsByTagName('HTML')[0];
        const body = window.document.body;
        const toggle = window.document.querySelector(`.${styles.toggleInner}`);

        if (darkMode) {
            html.setAttribute('data-theme', 'dark');
            window.localStorage.setItem('theme', 'dark');

            body.classList.add(styles.darkMode);
            toggle.classList.add(styles.toggleActive);
        } else {
            html.setAttribute('data-theme', 'light');
            window.localStorage.setItem('theme', 'light');

            body.classList.remove(styles.darkMode);
            toggle.classList.remove(styles.toggleActive);
        }
    }, [darkMode]);

    return (
        <div
            onMouseDown={onMouseDown}
            className={styles.toggle}
            onClick={() => (darkMode ? setDarkMode(false) : setDarkMode(true))}
        >
            <div className={styles.toggleInner} />
        </div>
    );
}

export default DarkMode;
/*
const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');

const hanleToggleTheme = () => {
    darkMode ? setDarkMode(false) : setDarkMode(true);
};

*/