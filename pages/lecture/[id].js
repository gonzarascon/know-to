import React from 'react';
import Head from 'next/head';

import { Layout, LectureContainer } from 'containers';
import { getLectureById } from 'lib/api/lecture';

function LectureId({ lectureData }) {
  console.log('lectureData', lectureData);

  // TODO: Handle page when lectureData comes empty
  return (
    <Layout>
      <Head>
        <link
          rel="stylesheet"
          href="https://highlightjs.org/static/demo/styles/night-owl.css"
        />
      </Head>
      <LectureContainer
        title={lectureData.title}
        content={lectureData.content}
      />
    </Layout>
  );
}

export default LectureId;

export async function getServerSideProps({ params }) {
  const lectureData = (await getLectureById(params.id)) || {};

  return {
    props: {
      lectureData,
    },
  };
}
