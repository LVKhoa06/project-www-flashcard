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
  const [condition, setCondition] = useState({ code: STATUS.UNKNOWN, message: '' });
  const refPass = useRef();
  const refUser = useRef();
  const router = useRouter();
  const redirect_to = router.query?.redirect_to;
  console.log(redirect_to);

  const transferRegisterPage = () => {
    router.replace("/register");
  };

  async function signInHandler() {
    const nickname = refUser.current.value.trim();
    const password = refPass.current.value.trim();

    if (!nickname && !password)
      return setCondition({ code: STATUS.ERROR, message: 'Vui lòng nhập thông tin của bạn' });

    if (!nickname)
      return setCondition({ code: STATUS.ERROR, message: 'Vui lòng nhập tên đăng nhập' });

    if (!password)
      return setCondition({ code: STATUS.ERROR, message: 'Vui lòng nhập mật khẩu' });

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
      <div className={styles.login_box}>
        <h2>Login</h2>
        <div className={styles.form}>
          <div className={styles.user_box}>
            <input onKeyDown={(event) => keyEnterHandler(event)} ref={refUser} type="text" />
            <label>Username</label>
          </div>
          <div className={styles.user_box}>
            <input onKeyDown={(event) => keyEnterHandler(event)} ref={refPass} type="password" />
            <label>Password</label>
          </div>
          <span className={styles.notification}>{condition.message}</span>
          <div className={styles.contain_btn}>
            <button onClick={signInHandler}>
              Sign in
            </button>
            <button onClick={transferRegisterPage}>
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
} // SignIn