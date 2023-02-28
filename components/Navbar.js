import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import Search from './Search';

function Navbar() {
    return (
        <>
            <div className={styles.topnav}>
                <Link href="/">Home</Link>
                <Link href="/create">Create Flashcard</Link>
                <Search/>
            </div>
        </>
    );
}

export default Navbar;