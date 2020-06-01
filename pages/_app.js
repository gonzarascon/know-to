import React from 'react';
import Head from 'next/head';
import { globalStyles } from 'lib/globalStyle';

import { wrapper } from 'store/store';

import { Layout } from 'containers';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>KnowTo — Inicios con React JS </title>
      </Head>
      <Layout>
        <Component {...pageProps} />
        <style jsx global>
          {globalStyles}
        </style>
      </Layout>
    </>
  );
}

export default wrapper.withRedux(MyApp);
