import React, { useEffect, useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

import _ from 'lodash';

import { getTotalLectures } from 'lib/api/lecture';
import { useRequest } from 'utils/helpers';
import { data as DocumentData } from 'constants';

import { Layout, LectureContainer } from 'containers';

import { useUserState } from 'contexts/UserContext';
import { parse } from 'path';

const { BASE_URL } = DocumentData;

export async function getServerSideProps(ctx) {
  const { auth_token } = parseCookies(ctx);
  const { id } = ctx.params;

  const user = await fetch(`${BASE_URL}/users/me`, {
    headers: new Headers({
      Authorization: `Bearer ${auth_token}`,
    }),
  }).then(async (response) => await response.json());

  const checkpoint = user.checkpoint ? parseInt(user.checkpoint) : 0;

  const totalLectures = await getTotalLectures();

  return {
    props: {
      totalLectures,
      checkpoint,
      actualLecture: parseInt(id),
    },
  };
}
function LectureId({ totalLectures, checkpoint, actualLecture }) {
  const [lectureData, setLectureData] = useState(null);
  const [lecutreQuestions, setLectureQuestions] = useState(null);
  const [isCompleted, setIsCompleted] = useState(null);

  const router = useRouter();
  const { userData } = useUserState();

  const { auth_token } = parseCookies();
  const { id } = router.query;
  const { data } = useRequest(
    id
      ? {
          url: `${BASE_URL}/clases?lecture_number=${id}`,
          headers: { Authorization: `Bearer ${auth_token}` },
        }
      : null
  );

  const { data: userProgress } = useRequest(
    userData?.id
      ? {
          url: `${BASE_URL}/user-clases/progress/${userData.id}`,
          headers: { Authorization: `Bearer ${auth_token}` },
        }
      : null
  );

  const { data: totalClasses } = useRequest({
    url: `${BASE_URL}/clases/count`,
  });

  const { data: userClase } = useRequest(
    userData?.id && id
      ? {
          url: `${BASE_URL}/user-clases?clase.lecture_number=${id}&user.id=${userData.id}`,
        }
      : null
  );

  useEffect(() => {
    if (checkpoint < parseInt(actualLecture)) {
      router.push(`/lecture/${checkpoint}`);
    }
  }, []);

  useEffect(() => {
    if (userClase) {
      setIsCompleted(userClase[0].completed);
    }
  }, [userClase]);

  useEffect(() => {
    // if (_.isArray(data) && _.isEmpty(data)) {
    //   router.push('/404');
    // }

    if (!_.isEmpty(data) && !_.isEqual(data[0], lectureData)) {
      setLectureData(data[0]);
      if (data[0].preguntas.enunciado !== null) {
        setLectureQuestions(data[0].preguntas);
      }
    }
  }, [data]);

  return (
    <Layout>
      <Head>
        <title>{`${
          lectureData ? `${lectureData.lecture_title}` : `Cargando Clase`
        } — Know To`}</title>
        <link
          rel="stylesheet"
          href="https://highlightjs.org/static/demo/styles/night-owl.css"
        />
      </Head>

      <LectureContainer
        title={lectureData?.lecture_title}
        content={lectureData?.lecture_content}
        isLoading={lectureData ? false : true}
        userProgress={userProgress}
        totalClasses={totalClasses}
        question={lecutreQuestions}
        completed={isCompleted}
      />
    </Layout>
  );
}

export default LectureId;
