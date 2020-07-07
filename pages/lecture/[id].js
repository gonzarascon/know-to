import React from 'react';
import Head from 'next/head';

import _ from 'lodash';

import { parseCookies } from 'nookies';

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

export async function getServerSideProps(ctx) {
  const { params, res } = ctx;
  const { auth_token } = parseCookies(ctx);
  const lectureData = (await getLectureById(params.id, auth_token)) || {};

  if (_.isEmpty(lectureData)) {
    res.setHeader('location', '/404');
    res.statusCode = 302;
    res.end();
    return;
  }

  return {
    props: {
      lectureData,
    },
  };
}
