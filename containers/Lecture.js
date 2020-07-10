import React from 'react';
import PropTypes from 'prop-types';

import SVG from 'react-inlinesvg';

import { media } from 'constants';
import { pxToRem } from 'utils/helpers';

import { Button, Markdown, ProgressBar } from 'components';
import { UniqueAnswer } from 'components/LectureQuestionInputs';

function Lecture({ title, content, isLoading }) {
  return (
    <>
      <section className="wrapper wrapper--lecture">
        <div className="wrapper__content">
          {isLoading && (
            <div className="wrapper__loading-state">
              <span className="wrapper__loading-label">Cargando...</span>
              <SVG src="/images/svg/loading-bars.svg" title="Cargando" />
            </div>
          )}
          {!isLoading && (
            <>
              <div className="wrapper__progress-container">
                <span className="wrapper__progress-label">Progreso</span>
                <ProgressBar percentage={50} />
              </div>
              <h3 className="wrapper__lecture-title">{title}</h3>
              <Markdown source={content} />
              <UniqueAnswer />
              <Button className="wrapper_submit">Siguiente clase</Button>
            </>
          )}
        </div>
      </section>
      <style jsx>
        {`
          .wrapper {
            &--lecture {
              display: flex;
              flex-direction: column;
            }

            &__content {
              @media ${media.mediumDevice} {
                width: 50%;
              }
            }

            &__loading-state {
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }

            &__loading-label {
              font-size: ${pxToRem(20)};
              margin: 20px auto;
              margin-bottom: 0;
            }

            &__lecture-title {
              font-size: ${pxToRem(30)};
              font-family: var(--f-Rubik);
            }

            &__progress-container {
              display: flex;
              flex-direction: row;
              flex-wrap: nowrap;
              align-items: center;

              margin-bottom: 50px;
            }

            &__progress-label {
              color: var(--gray-100);
              font-size: ${pxToRem(18)};
              margin-right: 30px;
            }

            &_link {
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
        `}
      </style>
    </>
  );
}

Lecture.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
};

export default Lecture;
