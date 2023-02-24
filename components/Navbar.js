import Link from 'next/link';
import styles from './Navbar.module.css';

function Navbar() {
    return (
        <>
            <div className={styles.topnav}>
                <Link href="/">Home</Link>
                <Link href="/create">Create</Link>
            </div>
        </>
    );
}

export default Navbar;