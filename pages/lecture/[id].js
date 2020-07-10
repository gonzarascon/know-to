import React, { useEffect, useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

import _ from 'lodash';

import { useRequest } from 'utils/helpers';
import { data as DocumentData } from 'constants';

import { Layout, LectureContainer } from 'containers';

const { BASE_URL } = DocumentData;

function LectureId() {
  const [lectureData, setLectureData] = useState(null);
  const router = useRouter();

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

  useEffect(() => {
    if (_.isArray(data) && _.isEmpty(data)) {
      router.push('/404');
    }

    if (!_.isEmpty(data) && !_.isEqual(data[0], lectureData)) {
      setLectureData(data[0]);
    }
  }, [data]);

  return (
    <Layout>
      <Head>
        <link
          rel="stylesheet"
          href="https://highlightjs.org/static/demo/styles/night-owl.css"
        />
      </Head>

      <LectureContainer
        title={lectureData?.lecture_title}
        content={lectureData?.lecture_content}
        isLoading={lectureData ? false : true}
      />
    </Layout>
  );
}

export default LectureId;
