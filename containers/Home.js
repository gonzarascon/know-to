import React from 'react';
import PropTypes from 'prop-types';

import { AnimatedText, Button } from 'components';

function Home() {
  return (
    <>
      <section className="wrapper wrapper--home">
        <div className="wrapper__content">
          <h2 className="wrapper__big-heading">Inicios en React JS</h2>
          <AnimatedText>
            En este curso aprenderás los fundamentos sobre la librería React.js
            la cual te permitirá crear sitios web y aplicaciones versátiles y
            fluidas.
          </AnimatedText>
          <Button>Comenzar</Button>
        </div>
      </section>
      <style jsx>
        {`
          .wrapper {
            &--home {
              display: flex;
              flex-direction: column;
              justify-content: center;

              & .wrapper__content {
                width: 50%;
              }

              & .wrapper__big-heading {
                margin-bottom: 25px;
              }
            }
          }
        `}
      </style>
    </>
  );
}

export default Home;
