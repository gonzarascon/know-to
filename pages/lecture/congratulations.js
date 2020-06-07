import React from 'react';
import Head from 'next/head';

import { Layout, CongratulationsContainer } from 'containers';

function LectureId() {
  return (
    <Layout>
      <Head>
        <title>¡Felicitaciones! — KnowTo</title>
      </Head>

      <CongratulationsContainer />
    </Layout>
  );
}

export default LectureId;
