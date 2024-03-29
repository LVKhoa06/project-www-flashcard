import '../styles/globals.scss'
import '../styles/Dark.scss'
import '../styles/Light.scss'
import { SessionProvider } from "next-auth/react";
import Head from 'next/head'
import Navbar from '@/components/Navbar/Navbar';
import images from 'assets';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }) {

  useEffect(() => {
    const html = window.document.getElementsByTagName('HTML')[0];
    const darkMode = typeof window === "undefined" ? '' :
      window.localStorage.getItem('theme') === 'dark'

    if (darkMode) {
      html.setAttribute('data-theme', 'dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
      window.localStorage.setItem('theme', 'light');
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={images.logo.src} />
      </Head>
      <SessionProvider session={pageProps.session}>
        <Navbar></Navbar>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
