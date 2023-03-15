import IconHome from 'assets/icon-home';
import IconCreate from 'assets/icon-create';
import styles from '../../styles/NavMobile.module.scss';
import IconCollection from 'assets/icon-collection';
import IconTopic from 'assets/icon-topic';
import IconSetting from 'assets/icon-setting';
import IconClose from 'assets/icon-close';
import Link from 'next/link';

function NavMobile(props) {
    const { show, setShow } = props;

    return (
        show ?
            <div className={styles.container}>
                <div className={styles['container-close']} onClick={() => setShow(false)}>
                    <span className={styles.close}><IconClose /></span>
                </div>
                <div className={styles['container-menu']}>
                    <Link href='/' onClick={() => setShow(false)} className={styles['item']}>
                        <span><IconHome viewBox="0 0 1024 1024" /></span>
                        <span>Home</span>
                    </Link>
                    <Link href='/collections' onClick={() => setShow(false)} className={styles['item']}>
                        <span><IconCollection viewBox="0 -43.5 1111 1111" /></span>
                        <span>Collections</span>
                    </Link>
                    <Link href='/topics' onClick={() => setShow(false)} className={styles['item']}>
                        <span><IconTopic viewBox="0 -43.5 1111 1111" /></span>
                        <span>Topics</span>
                    </Link>
                    <Link href='/create' onClick={() => setShow(false)} className={styles['item']}>
                        <span><IconCreate stroke='#3688ff' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' /></span>
                        <span>Create</span>
                    </Link>
                    <Link href='/' onClick={() => setShow(false)} className={styles['item']}>
                        <span><IconCreate stroke='#3688ff' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' /></span>
                        <span>Sign-in</span>
                    </Link>
                    <Link href='/' onClick={() => setShow(false)} className={styles['item']}>
                        <span><IconCreate stroke='#3688ff' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' /></span>
                        <span>Sign-up</span>
                    </Link>

                    <div>
                        <div className={styles['item']}>
                            <span><IconSetting stroke='#3688ff' fillRule='evenodd' clipRule='evenodd' strokeLinejoin='round' strokeMiterlimit='2' viewBox="0 0 32 32" /></span>
                            <span>Setttings</span>
                        </div>
                    </div>
                </div>
            </div> : ''

    );
}

export default NavMobile;