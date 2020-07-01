import React from 'react';

import { globalStyles } from 'lib/globalStyle';

import { UserContextProvider } from 'contexts/UserContext';
import { ProfileConfigurationContextProvider } from 'contexts/ProfileConfigurationContext';

function MyApp({ Component, pageProps }) {
  return (
    <>
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
