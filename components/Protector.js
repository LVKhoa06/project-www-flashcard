import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Protector(props) {
    const router = useRouter();
    const path = router.pathname;
    const { data: session, status } = useSession();

    if (status === 'loading')
        return (
            <>
                <Head>
                    <title>Loading...</title>
                </Head>
                <div className='welcome'>
                    <h1 className='title'>Loading...</h1>
                </div>
            </>
            )

    if (!session)
        router.replace(`/sign-in?redirect_to=${path}`)

    return props.children;
} // Protector