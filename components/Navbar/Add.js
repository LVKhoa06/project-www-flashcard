import Link from 'next/link';
import { useState } from 'react';
import styles from '../../styles/Navbar.module.css';
import IconAdd from '../../assets/icon-add.js';

function Add() {

    return (
        <>
            <div className={styles.container_add}>
                <div className={styles.icon}>
                    <IconAdd viewBox="0 0 39 24" className={styles['btn-add']}/>
                </div>
                <div className={styles.menu}>
                    <Link className={styles.menu_item} href="/create">Flashcard</Link>
                </div>
            </div>
        </>
    );
}

export default Add;