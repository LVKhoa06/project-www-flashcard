import IconMenuNav from 'assets/icon-menu-nav';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../../styles/Navbar.module.scss';
import Add from './Add';
import NavMobile from './NavMobile';
import Search from './Search';

function Navbar() {
    const [show, setShow] = useState(false);
    const { data: session, status } = useSession();

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
                    <Link className={styles['sign-in']} href="/sign-in">
                        <span>Sign-in</span>
                    </Link>
                    {session ?
                        <Link onClick={() => signOut({ callbackUrl: "/" })} className={styles['sign-up']} href="/">
                            <span>Sign-out</span>
                        </Link>
                        :
                        <Link className={styles['sign-up']} href="/sign-up">
                            <span>Sign-up</span>
                        </Link>
                    }

                </div>
            </div>
            <NavMobile show={show} setShow={setShow} />
        </>
    );
}

export default Navbar;

