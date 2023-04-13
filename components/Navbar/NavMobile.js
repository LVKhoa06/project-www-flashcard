import IconHome from 'assets/icon-home';
import IconCreate from 'assets/icon-create';
import styles from '../../styles/NavMobile.module.scss';
import IconCollection from 'assets/icon-collection';
import IconTopic from 'assets/icon-topic';
import IconSetting from 'assets/icon-setting';
import IconClose from 'assets/icon-close';
import IconSignOut from 'assets/icon-signout';
import Link from 'next/link';
import IconRecover from 'assets/icon-recover';
import { signOut, useSession } from 'next-auth/react';
import IconSignIn from 'assets/icon-signin';
import IconSignUp from 'assets/icon-signup';

function NavMobile(props) {
    const { show, setShow } = props;
    const { data: session, status } = useSession();

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
                    <Link href='/bin' onClick={() => setShow(false)} className={styles['item']}>
                        <span className={styles.recover}><IconRecover fill="#3688ff" viewBox="0 0 64 64" version="1.1" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" /></span>
                        <span>Bin</span>
                    </Link>


                    {session ?
                        <Link href='/' onClick={() => {
                            signOut({ callbackUrl: "/sign-in" })
                            setShow(false)
                        }} className={styles['item']}>
                            <span ><IconSignOut /></span>
                            <span>Sign-out</span>
                        </Link>
                        :
                        <>
                            <Link href="/sign-in" onClick={() => setShow(false)} className={styles['item']}>
                                <span><IconSignIn /></span>
                                <span>Sign-in</span>
                            </Link>
                            <Link href='/sign-up' onClick={() => setShow(false)} className={styles['item']}>
                                <span ><IconSignUp /></span>
                                <span>Sign-up</span>
                            </Link>
                        </>

                    }
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