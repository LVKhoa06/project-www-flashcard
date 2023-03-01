import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Navbar.module.css';
import Icon from './assets/icon-add.js';
import CreateCollection from './Create-collection';

function Add() {
    const [show, setShow] = useState(false);

    return (
        <>
            <div className={styles.container_add}>
                <div className={styles.icon}>
                    <Icon />
                </div>
                <div className={styles.menu}>
                    <Link className={styles.menu_item} href="/create">Flashcard</Link>
                    <div onClick={() => setShow(!show)} className={styles.menu_item} >Collection</div>
                    <div className={styles.menu_item} >Topic</div>
                </div>
            </div>
            {show ? <CreateCollection /> : ''}
        </>


    );
}

export default Add;


