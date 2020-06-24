import React from 'react';

import { globalStyles } from 'lib/globalStyle';

import { UserContextProvider } from 'contexts/UserContext';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
      <style jsx global>
        {globalStyles}
      </style>
    </>
  );
}

export default MyApp;
