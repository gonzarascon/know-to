import React, { useEffect } from 'react';
import Head from 'next/head';
import { MediaContextProvider } from 'utils/mediaRender';

import { getTotalLectures } from 'lib/api/lecture';

import { Layout, HomeContainer } from 'containers';
import { getCurso } from 'lib/api/getCurso';

function Home({ courseData, totalClasses }) {
  const { title: courseTitle, description, portada } = courseData;

  useEffect(() => {
    const prevCourseData = localStorage.getItem('courseData');
    if (courseData !== {} || JSON.stringify(courseData) !== prevCourseData) {
      localStorage.setItem('courseData', JSON.stringify(courseData));
    }
  }, []);

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
          totalClasses={totalClasses}
        />
      </MediaContextProvider>
    </Layout>
  );
}

export async function getServerSideProps() {
  const courseData = (await getCurso()) || {};
  const totalLectures = await getTotalLectures();

  return {
    props: {
      courseData,
      totalClasses: totalLectures,
    },
  };
}

export default Home;
