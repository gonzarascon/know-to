import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

import _, { set } from 'lodash';

import SVG from 'react-inlinesvg';

import { media } from 'constants';
import { pxToRem } from 'utils/helpers';

import { Button, Markdown, ProgressBar, Explanation } from 'components';
import { UniqueAnswer } from 'components/LectureQuestionInputs';
import { useUserState } from 'contexts/UserContext';

import { updateUserData } from 'lib/api/user';
import { setLectureCompleted } from 'lib/api/userLecture';

function Lecture({
  title,
  content,
  isLoading,
  userProgress,
  totalClasses,
  question,
  completed,
}) {
  const { userData } = useUserState();

  const [progress, setProgress] = useState(0);
  const [canContinue, setCanContinue] = useState(false);
  const [approved, setApproved] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasSubmited, setHasSubmited] = useState(false);
  const [isCompleted, setIsCompleted] = useState(completed);

  useEffect(() => {
    if (question) {
      setCanContinue(false);
    } else {
      setCanContinue(true);
      setApproved(true);
    }
  }, [question]);

  useEffect(() => {
    if (completed !== null) {
      setIsCompleted(completed);
    }
  }, [completed]);

  useEffect(() => {
    if (isCompleted === true) {
      setCanContinue(true);
    }
  }, [isCompleted]);

  useEffect(() => {
    if (userProgress && totalClasses) {
      const totalProgressPercentage =
        (userProgress.completedClasses * 100) / totalClasses;

      setProgress(totalProgressPercentage);
    }
  }, [userProgress, totalClasses]);

  const { auth_token } = parseCookies();

  const router = useRouter();

  async function handleContinueClick() {
    const { id } = router.query;
    const newLectureNumber = parseInt(id) + 1;

    console.log(isCompleted);

    if (!isCompleted) {
      await setLectureCompleted({
        lecture_number: id,
        user_id: userData.id,
        approved,
        auth_token,
      });

      const newUserData = {
        ...userData,
        checkpoint: newLectureNumber,
      };

      await updateUserData({ userData: newUserData }).then(() => {
        if (newLectureNumber > totalClasses) {
          router.push(`/lecture/congratulations`);
        } else {
          router.push(`/lecture/${newLectureNumber}`);
        }
      });
    } else {
      if (newLectureNumber > totalClasses) {
        router.push(`/lecture/congratulations`);
      } else {
        router.push(`/lecture/${newLectureNumber}`);
      }
    }
  }

  function checkResponseValue() {
    if (selectedOption) {
      const answerResult = _.find(
        question.respuestas,
        (o) => o.respuesta === selectedOption
      );

      setApproved(answerResult.correcta);
      setHasSubmited(true);
      setCanContinue(true);
    }
  }

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
                <ProgressBar percentage={progress} />
              </div>
              <h3 className="wrapper__lecture-title">{title}</h3>
              <Markdown source={content} />
              {question && !hasSubmited && isCompleted === false && (
                <UniqueAnswer
                  statement={question.enunciado}
                  questions={question.respuestas}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
              )}
              {hasSubmited && (
                <Explanation correct={approved} text={question.explicacion} />
              )}
              {question && isCompleted && (
                <section className="wrapper__completed-message">
                  <p className="wrapper__completed-text">
                    Esta clase está completa y no puedes volver a ingresar tu
                    respuesta.
                  </p>
                </section>
              )}
              <Button
                className="wrapper_submit"
                onClick={
                  canContinue
                    ? () => handleContinueClick()
                    : () => checkResponseValue()
                }
              >
                {!canContinue ? 'Enviar respuesta' : 'Siguiente clase'}
              </Button>
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

            &__completed-message {
              display: flex;
              flex-direction: column;
              background-color: var(--action-primary-100);
              color: var(--action-primary);
              padding: 15px;
              border-radius: 15px;
              margin-top: 35px;

              @media ${media.mediumDevice} {
                padding: 25px;
              }
            }

            &__completed-text {
              font-size: ${pxToRem(18)};

              @media ${media.mediumDevice} {
                font-size: ${pxToRem(20)};
              }
            }

            &__content {
              @media ${media.mediumDevice} {
                width: 60%;
              }
              @media ${media.largeDevice} {
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
