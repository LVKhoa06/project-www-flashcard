import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import Add from './Add';
import Search from './Search';

function Navbar() {
    return (
        <>
            <div className={styles.topnav}>
                <Link href="/">Home</Link>
                <Link href="/">Topics</Link>
                <Link href="/">Collections</Link>
                <Search/>
                <Add/>
            </div>
        </>
    );
}

export default Navbar;