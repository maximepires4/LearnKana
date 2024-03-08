import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

    return (
        <>
            <Head>
                <title>LearnKana</title>
                <link rel="icon" href="/logo.svg" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}
export default MyApp