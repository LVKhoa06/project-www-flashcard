import Link from 'next/link';
import styles from '../../styles/Navbar.module.css';
import Add from './Add';
import Search from './Search';

function Navbar() {
    return (
        <>
            <div className={styles.topnav}>
                <Link className={styles.item} href="/">Home</Link>
                <Link className={styles.item} href="/topics">Topics</Link>
                <Link className={styles.item} href="/collections">Collections</Link>
                <Search/>
                <Add/>
            </div>
        </>
    );
}

export default Navbar;