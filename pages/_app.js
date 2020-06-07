import React from 'react';

import { globalStyles } from 'lib/globalStyle';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>
        {globalStyles}
      </style>
    </>
  );
}

export default MyApp;
