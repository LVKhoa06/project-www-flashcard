import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import styles from "../../styles/Sign-in.module.scss";

const STATUS = {
  UNKNOWN: -1,
  ERROR: 0,
  CORRECT: 1,
  OTHER: 2,
};

export default function SignIn() {
  const { data: session, status } = useSession();
  const refPass = useRef();
  const refUser = useRef();
  const router = useRouter();
  const redirect_to = router.query?.redirect_to;
  const [condition, setCondition] = useState({ code: STATUS.UNKNOWN, message: "" });

  const signInHandler = async () => {
    const username = refUser.current.value.trim();
    const password = refPass.current.value.trim();

    if (!username)
      return setCondition({ code: STATUS.ERROR, message: 'Please enter your username' });

    if (!password)
      return setCondition({ code: STATUS.ERROR, message: 'Please enter your password' });

    const result = await signIn("credentials", {
      redirect: false,
      nickname: username,
      password,
    });

    const { error, ok } = result;
    if (ok && redirect_to)
      return router.replace(redirect_to);
    else if (ok) {
      router.replace('/');
    }
    setCondition({ code: STATUS.ERROR, message: error });
  } // signInHandler

  const keyEnterHandler = (event) => {
    if (event.key === 'Enter')
      signInHandler();
  }// keyEnterHandler

  if (status === 'loading') {
    return (
      <>
        <Head>
          <title>Loading...</title>
        </Head>
        <div className={styles.welcome}>
          <h1 className={styles.title}>Loading...</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Sign-in</title>
      </Head>
      <div className={styles.overlay}>
        <div className={styles.login_box}>
          <h2>Sign-in</h2>
          <div className={styles.form}>
            <div className={styles.user_box}>
              <input placeholder="Username" onKeyDown={(event) => keyEnterHandler(event)} ref={refUser} type="text" />
            </div>
            <div className={styles.user_box}>
              <input placeholder="Password" onKeyDown={(event) => keyEnterHandler(event)} ref={refPass} type="password" />
            </div>
            <span className={`${condition.code === -1 ?
              styles.unknown :
              condition.code < 1 ?
                styles.error :
                styles.success
              } 
          ${styles.notification}`}>{condition.message}</span>
            <div className={styles.contain_btn}>
              <button onClick={signInHandler}>
                Sign-in
              </button>
              <button>
                <Link href="/sign-up">
                  {'Sign-up>'}
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} // SignIn