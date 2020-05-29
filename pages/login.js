import React from 'react';
import Head from 'next/head';

import { LoginContainer } from 'containers';

function Login() {
  return (
    <>
      <Head>
        <title> Ingresa a tu cuenta — KnowTo</title>
      </Head>
      <LoginContainer />
    </>
  );
}

export default Login;
