import React from 'react';
import Head from 'next/head';

import { Layout, SignupContainer } from 'containers';

function SignUp() {
  return (
    <Layout>
      <Head>
        <title> Crea una cuenta — KnowTo</title>
      </Head>
      <SignupContainer />
    </Layout>
  );
}

export default SignUp;
