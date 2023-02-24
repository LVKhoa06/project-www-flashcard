import Link from 'next/link';
import styles from './Navbar.module.css';

function Navbar() {
    return (
        <>
            <div className={styles.topnav}>
                <Link href="/">Home</Link>
                <Link href="/create">Create</Link>
                <Link href="/test">Test</Link>
            </div>
        </>
    );
}

export default Navbar;