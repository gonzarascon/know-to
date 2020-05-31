import React from 'react';
import PropTypes from 'prop-types';

import markdownTest from 'constants/markdownTest';

import { media } from 'constants';
import { pxToRem } from 'utils/helpers';

import { Button, Markdown, ProgressBar } from 'components';
import { UniqueAnswer } from 'components/LectureQuestionInputs';

function Lecture() {
  return (
    <>
      <section className="wrapper wrapper--lecture">
        <div className="wrapper__content">
          <div className="wrapper__progress-container">
            <span className="wrapper__progress-label">Progreso</span>
            <ProgressBar percentage={50} />
          </div>
          <h3 className="wrapper__lecture-title">
            Clase 1: Configuración del entorno.
          </h3>
          <Markdown source={markdownTest} />
          <UniqueAnswer />
          <Button className="wrapper_submit">Siguiente clase</Button>
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
                  width: 50%;
                }
              }

              & .wrapper__lecture-title {
                font-size: ${pxToRem(30)};
                font-family: var(--f-Rubik);
              }

              & .wrapper__progress-container {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                align-items: center;

                margin-bottom: 50px;
              }

              & .wrapper__progress-label {
                color: var(--gray-100);
                font-size: ${pxToRem(18)};
                margin-right: 30px;
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
