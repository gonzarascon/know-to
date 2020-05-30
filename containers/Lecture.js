import React from 'react';
import PropTypes from 'prop-types';

import markdownTest from 'constants/markdownTest';

import { media } from 'constants';
import { pxToRem } from 'utils/helpers';

import { Button, Markdown } from 'components';

function Lecture() {
  return (
    <>
      <section className="wrapper wrapper--lecture">
        <div className="wrapper__content">
          <h3 className="wrapper__lecture-title">
            Clase 1: Configuración del entorno.
          </h3>
          <article className="wrapper__lecture-content">
            <Markdown source={markdownTest} />
          </article>
          <Button className="wrapper_submit">Inciar sesión</Button>
        </div>
      </section>
      <style jsx>
        {`
          .wrapper {
            &--lecture {
              display: flex;
              flex-direction: column;

              & .wrapper__content {
                @media ${media.mediumDevice} {
                  width: 40%;
                }
              }

              & .wrapper__lecture-title {
                font-size: ${pxToRem(30)};
                font-family: var(--f-Rubik);
              }

              & .wrapper__lecture-content {
                font-size: ${pxToRem(18)};
                margin-top: 20px;
              }

              & .wrapper_link {
                color: var(--action-primary);
                margin: 15px 0;
                display: inline-block;
                font-size: ${pxToRem(18)};
                text-decoration: none;
              }

              & :global(.wrapper_submit) {
                margin-top: 50px;
              }
            }
          }
        `}
      </style>
    </>
  );
}

export default Lecture;
