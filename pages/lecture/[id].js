import React from 'react';
import Head from 'next/head';
import { MediaContextProvider } from 'utils/mediaRender';

import { LectureContainer } from 'containers';

function LectureId() {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://highlightjs.org/static/demo/styles/night-owl.css"
        />
      </Head>
      <MediaContextProvider>
        <LectureContainer />
      </MediaContextProvider>
    </>
  );
}

export default LectureId;
