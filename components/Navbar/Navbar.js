import images from 'assets';
import IconMenuNav from 'assets/icon-menu-nav';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../../styles/Navbar.module.scss';
import Add from './Add';
import NavMobile from './NavMobile';
import Search from './Search';

function Navbar() {
    const [show, setShow] = useState(false);

    return (
        <>
            <div className={styles.topnav}>
                <div className={styles['top-left']}>
                    <Link className={styles.item} href="/">Home</Link>
                    <Link className={styles.item} href="/topics">Topics</Link>
                    <Link className={styles.item} href="/collections">Collections</Link>
                    <div onClick={() => setShow(!show)} className={styles.menu}>
                        <IconMenuNav stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </div>
                </div>
                <div className={styles['top-center']}>
                    <Search />
                </div>
                <div className={styles['top-right']}>
                    <Add />
                    <Link className={styles['log-in']} href="/">Sign-in</Link>
                    <Link className={styles['log-in']} href="/">Sign-up</Link>
                </div>
            </div>
            <NavMobile show={show} setShow={setShow} />
        </>
    );
}

export default Navbar;