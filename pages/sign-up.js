import React from 'react';
import Head from 'next/head';

import { SignupContainer } from 'containers';

function SignUp() {
  return (
    <>
      <Head>
        <title> Crea una cuenta — KnowTo</title>
      </Head>
      <SignupContainer />
    </>
  );
}

export default SignUp;
