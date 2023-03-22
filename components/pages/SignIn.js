import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import Head from "next/head";
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
  console.log(redirect_to);

  async function signInHandler() {
    const nickname = refUser.current.value.trim();
    const password = refPass.current.value.trim();

    if (!nickname && !password)
      return;

    if (!nickname)
      return;

    if (!password)
      return;

    const result = await signIn("credentials", {
      redirect: false,
      nickname,
      password,
    });

    const { error, ok } = result;
    if (ok && redirect_to)
      return router.replace(redirect_to);
    else if (ok) {
      router.replace('/');
    }
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
      <div className={styles.login_box}>
        <h2>Login</h2>
        <div className={styles.form}>
          <div className={styles.user_box}>
            <input placeholder="Nickname" onKeyDown={(event) => keyEnterHandler(event)} ref={refUser} type="text" />
          </div>
          <div className={styles.user_box}>
            <input placeholder="Password" onKeyDown={(event) => keyEnterHandler(event)} ref={refPass} type="password" />
          </div>
          <div className={styles.contain_btn}>
            <button onClick={signInHandler}>
              Sign in
            </button>
            <button>
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
} // SignIn