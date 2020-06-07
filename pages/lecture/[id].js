import React from 'react';
import Head from 'next/head';

import { Layout, LectureContainer } from 'containers';
import { getCurso } from 'lib/api/getCurso';
import { getLectureById } from 'lib/api/lecture';
import { getLecturesSlugs } from '../../lib/api/lecture';

function LectureId({ lectureData, coursePortada }) {
  console.log('lectureData', lectureData);
  return (
    <Layout backgroundImage={coursePortada}>
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

export async function getStaticProps() {
  const courseData = (await getCurso()) || {};
  const lectureData = (await getLectureById()) || {};

  const coursePortada = courseData.portada.url;

  console.log('lectureData', lectureData);

  return {
    props: {
      lectureData,
      coursePortada,
    },
  };
}

export async function getStaticPaths() {
  const allLectures = (await getLecturesSlugs()) || [];

  console.log(allLectures.map((lecture) => `/lecture/${lecture.slug}`));

  return {
    paths: allLectures.map((lecture) => `/lecture/${lecture.slug}`) || [],
    fallback: false,
  };
}
