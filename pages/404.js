import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { Layout } from 'containers';

import { pxToRem } from 'utils/helpers';
import { media } from 'constants';

function Home() {
  return (
    <Layout>
      <Head>
        <title>¡Ups! — KnowTo </title>
      </Head>
      <section className="wrapper wrapper--404">
        <h3 className="wrapper__big-heading">¡Ups! 🤔</h3>
        <p className="wrapper__description">
          La página que estabas buscando no existe. <br />
          <Link href="/">
            <a>Puedes volver al inicio para continuar con el curso.</a>
          </Link>
        </p>
      </section>
      <style jsx>{`
        .wrapper {
          &--404 {
            display: flex;

            flex-direction: column;
            justify-content: center;

            @media ${media.mediumDevice} {
              max-width: 60%;
            }
          }

          &__big-heading {
            margin-bottom: 25px;
          }

          &__description {
            font-size: ${pxToRem(25)};

            & a {
              color: var(--action-primary);
              text-decoration: none;
            }
          }
        }
      `}</style>
    </Layout>
  );
}

export default Home;
