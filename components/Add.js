import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Navbar.module.css';
import CreateCollection from './Create-collection';

function Add() {
    const [show, setShow] = useState(false);

    return (
        <>
            <div className={styles.container_add}>
                <div className={styles.icon}>
                    <svg width="24" height="24" viewBox="0 0 39 24" fill="green">
                        <g transform="scale(0.03125 0.03125)">
                            <path
                                d="M992 384h-352v-352c0-17.672-14.328-32-32-32h-192c-17.672 0-32 14.328-32 32v352h-352c-17.672 0-32 14.328-32 32v192c0 17.672 14.328 32 32 32h352v352c0 17.672 14.328 32 32 32h192c17.672 0 32-14.328 32-32v-352h352c17.672 0 32-14.328 32-32v-192c0-17.672-14.328-32-32-32z">
                            </path>
                        </g>
                    </svg>
                </div>
                <div className={styles.menu}>
                    <Link className={styles.menu_item} href="/create">Flashcard</Link>
                    <div onClick={() => setShow(!show)} className={styles.menu_item} >Collection</div>
                    <div className={styles.menu_item} >Topic</div>
                </div>
            </div>
            {show ? <CreateCollection/> : ''}
        </>


    );
}

export default Add;