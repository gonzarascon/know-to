import React, { useEffect } from 'react';
import Head from 'next/head';
import { MediaContextProvider } from 'utils/mediaRender';

import { Layout, HomeContainer } from 'containers';
import { getCurso } from 'lib/api/getCurso';

function Home({ courseData }) {
  console.log('courseData', courseData);

  const { title: courseTitle, description, portada } = courseData;

  useEffect(() => {
    const prevCourseData = localStorage.getItem('courseData');
    if (courseData !== {} || JSON.stringify(courseData) !== prevCourseData) {
      localStorage.setItem('courseData', JSON.stringify(courseData));
    }
  }, [courseData]);

  return (
    <Layout backgroundImage={portada.url}>
      <Head>
        <title>{courseTitle} — KnowTo </title>
      </Head>
      <MediaContextProvider>
        <HomeContainer
          courseTitle={courseTitle}
          courseDescription={description}
          coursePortada={portada}
        />
      </MediaContextProvider>
    </Layout>
  );
}

export async function getStaticProps() {
  const courseData = (await getCurso()) || {};

  return {
    props: {
      courseData,
    },
  };
}

export default Home;
