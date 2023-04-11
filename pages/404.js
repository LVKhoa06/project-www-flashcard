import Link from 'next/link';
import styles from '../styles/404.module.scss'

export default function Page404() {
    return (
        <div className={styles.container}>
            <h1>404 - Page Not Found</h1>
            <Link href="/">
                Go back home
            </Link>
        </div>
    )

}