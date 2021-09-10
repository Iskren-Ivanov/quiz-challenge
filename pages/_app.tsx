import Head from 'next/head'
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return <div>
    <Head>
      <link rel="stylesheet" href="https://use.typekit.net/sly1ocm.css" />
    </Head>
    <Component {...pageProps} />;
</div>
}

export default MyApp;
