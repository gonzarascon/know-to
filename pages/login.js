import React from 'react';
import Head from 'next/head';

import { Layout, LoginContainer } from 'containers';

function Login() {
  return (
    <Layout>
      <Head>
        <title> Ingresa a tu cuenta — KnowTo</title>
      </Head>
      <LoginContainer />
    </Layout>
  );
}

export default Login;
