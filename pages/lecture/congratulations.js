import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { parseCookies } from 'nookies';

import { useRequest } from 'utils/helpers';

import { data as DocumentData } from 'constants';

const { BASE_URL } = DocumentData;

import { useUserState } from 'contexts/UserContext';
import { Layout, CongratulationsContainer } from 'containers';

function Congratulations() {
  const [courseTitle, setCourseTitle] = useState('');
  const [userFinalPoints, setUserFinalPoints] = useState(0);
  const { userData } = useUserState();

  const { auth_token } = parseCookies();

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

  useEffect(() => {
    if (userProgress && totalClasses) {
      const totalProgressPercentage =
        (userProgress.completedClasses * 100) / totalClasses;

      setUserFinalPoints(Math.round(totalProgressPercentage));
    }
  }, [userProgress, totalClasses]);

  useEffect(() => {
    const courseData = JSON.parse(localStorage.getItem('courseData'));
    setCourseTitle(courseData.title);
  }, []);

  return (
    <Layout>
      <Head>
        <title>¡Felicitaciones! — KnowTo</title>
      </Head>

      <CongratulationsContainer
        courseTitle={courseTitle}
        userPoints={userFinalPoints}
      />
    </Layout>
  );
}

export default Congratulations;
