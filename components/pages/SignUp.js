import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Sign-in.module.scss";
import crypto from 'crypto';

const STATUS = {
  UNKNOWN: -1,
  ERROR: 0,
  CORRECT: 1,
  OTHER: 2,
};

function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [condition, setCondition] = useState({ code: STATUS.UNKNOWN, message: "" });

  const signUpHandler = async () => {
    if (!username)
      return setCondition({ code: STATUS.ERROR, message: 'Please enter your username!' })

    if (!password)
      return setCondition({ code: STATUS.ERROR, message: 'Please enter your password !' })

    if (!confirmPassword)
      return setCondition({ code: STATUS.ERROR, message: 'Please confirm password !' })

    if (password !== confirmPassword)
      return setCondition({ code: STATUS.ERROR, message: 'Re-confirm incorrect password !' })

    // Snippet
    try {
      const fetch = await axios.post(
        "/api/auth/sign-up",
        {
          id: crypto.randomBytes(20).toString('hex'),
          username,
          password,
        },
        {
          "Content-Type": "application/json",
        }
      ); // fetch

      const result = fetch.data;
      const { success, message } = result;

      if (!success)
        return setCondition({ code: STATUS.ERROR, message })
      else {
        setCondition({ code: STATUS.CORRECT, message })

        // Reset stuff
        setUsername("");
        setPassword("");
        setConfirmPassword("");
      } // else
    } catch (ex) {
      console.log(ex.message);
      setCondition({ code: STATUS.OTHER, message: ex.message });
    }
  } // registerHandler

  const keyEnterHandler = (event) => {
    if (event.key === 'Enter')
      signUpHandler();
  } // keyEnterHandler

  const backLSignInPage = () => {
    router.replace("/sign-in");
  }; // backLoginPage

  return (
    <>
      <Head>
        <title>Sign-up</title>
      </Head>
      <div className={styles.overlay}>
        <div className={styles.login_box}>
          <h2>Sign-up</h2>
          <div className={styles.form}>
            {/* Input ---------------- START*/}
            <div className={styles.user_box}>
              <input
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                onKeyDown={(event) => keyEnterHandler(event)}
                value={username}
                placeholder="Username"
              />
            </div>
            <div className={styles.user_box}>
              <input
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                onKeyDown={(event) => keyEnterHandler(event)}
                value={password}
                placeholder="Password"
                type="password"
              />
            </div>
            <div className={styles.user_box}>
              <input
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
                onKeyDown={(event) => keyEnterHandler(event)}
                value={confirmPassword}
                placeholder="Confirm password"
                type="password"
              />
            </div>
            {/* Input ---------------- END*/}

            {/* Notification ---------------- START*/}
            <span className={`${condition.code === -1 ?
              styles.unknown :
              condition.code < 1 ?
                styles.error :
                styles.success
              } 
          ${styles.notification}`}>{condition.message}</span>
            {/* Notification ---------------- END*/}

            {/* Button  ---------------- START*/}
            <div className={styles.contain_btn}>
              <button onClick={signUpHandler}>
                Submit
              </button>
              <button onClick={backLSignInPage}>
                {'Sign-in>'}
              </button>
            </div>
            {/* Button  ---------------- END*/}
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;