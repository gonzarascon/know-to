import React from 'react';
import Head from 'next/head';

import { globalStyles } from 'lib/globalStyle';

import { UserContextProvider } from 'contexts/UserContext';
import { ProfileConfigurationContextProvider } from 'contexts/ProfileConfigurationContext';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Know-To</title>
      </Head>
      <UserContextProvider>
        <ProfileConfigurationContextProvider>
          <Component {...pageProps} />
        </ProfileConfigurationContextProvider>
      </UserContextProvider>
      <style jsx global>
        {globalStyles}
      </style>
    </>
  );
}

export default MyApp;
