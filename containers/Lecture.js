import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

import SVG from 'react-inlinesvg';

import { media } from 'constants';
import { pxToRem } from 'utils/helpers';

import { Button, Markdown, ProgressBar } from 'components';
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
}) {
  const { userData } = useUserState();

  const [progress, setProgress] = useState(0);
  const [canContinue, setCanContinue] = useState(false);
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    if (!question) {
      setCanContinue(true);
    }
  }, [question]);

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
    if (newLectureNumber > totalClasses) {
      router.push(`/lecture/congratulations`);
      return;
    }

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
      router.push(`/lecture/${newLectureNumber}`);
    });
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
              {question && (
                <UniqueAnswer
                  statement={question.enunciado}
                  questions={question.respuestas}
                />
              )}
              <Button className="wrapper_submit" onClick={handleContinueClick}>
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
