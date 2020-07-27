import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { parseCookies } from 'nookies';

import { media, data as DocumentData } from 'constants';
import { Media } from 'utils/mediaRender';

import { useRequest } from 'utils/helpers';

import { CheckCircleOutlined } from '@ant-design/icons';
import { useUserState } from 'contexts/UserContext';
import { AnimatedText, Button } from 'components';

const { BASE_URL } = DocumentData;
function Home({ courseTitle, courseDescription, coursePortada, totalClasses }) {
  const { userData } = useUserState();
  const [isCompleted, setIsCompleted] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userFinalPoints, setUserFinalPoints] = useState(0);

  const { auth_token } = parseCookies();

  const { data: userProgress } = useRequest(
    userData
      ? {
          url: `${BASE_URL}/user-clases/progress/${userData.id}`,
          headers: { Authorization: `Bearer ${auth_token}` },
        }
      : null
  );

  useEffect(() => {
    if (userProgress && totalClasses) {
      console.log(userProgress);
      const totalProgressPercentage =
        (userProgress.approvedClasses * 100) / totalClasses;

      setUserFinalPoints(Math.round(totalProgressPercentage));
    }
  }, [userProgress, totalClasses]);

  useEffect(() => {
    if (userData) {
      const lastClass = userData?.checkpoint === null ? 1 : userData.checkpoint;
      console.log(lastClass);
      if (parseInt(lastClass) === totalClasses + 1) {
        setIsCompleted(true);
      } else {
        setIsCompleted(false);
      }
    } else {
      setIsCompleted(false);
    }
    setIsLoading(false);
  }, [userData]);

  function handleStartClick() {
    if (userData && isCompleted === false) {
      const lastClass = userData.checkpoint === null ? 1 : userData.checkpoint;

      Router.push(`/lecture/${lastClass}`);
    } else {
      Router.push('/login');
    }
  }

  return (
    <>
      <section className="wrapper wrapper--home">
        <div className="wrapper__content">
          <Media at="xs">
            <div className="wrapper__mobile-picture-container">
              <img
                className="wrapper__mobile-picutre"
                src={coursePortada.url}
                alt={coursePortada.alt}
              />
            </div>
          </Media>
          <h2 className="wrapper__big-heading">{courseTitle}</h2>
          <AnimatedText className="wrapper__description">
            {courseDescription}
          </AnimatedText>
          {isCompleted !== true && !isLoading && (
            <Button onClick={() => handleStartClick()}>Comenzar</Button>
          )}
          {isCompleted && !isLoading && (
            <span className="wrapper__completed_badge">
              <span>
                Curso completo. <br />
                Puntaje total: {userFinalPoints} / 100
              </span>
              <CheckCircleOutlined className="wrapper__completed_icon" />
            </span>
          )}
        </div>
      </section>
      <style jsx>
        {`
          .wrapper {
            &--home {
              display: flex;
              flex-direction: column;
              justify-content: center;

              & .wrapper__mobile-picture-container {
                width: 100%;
                height: 330px;
                margin-bottom: 50px;
                position: absolute;
                left: 0;
                top: 120px;
                z-index: 1;
              }

              & .wrapper__mobile-picutre {
                height: 100%;
                width: 100%;
                object-fit: cover;
              }

              & .wrapper__big-heading {
                margin-bottom: 25px;
              }

              & .wrapper__content {
                margin-top: 375px;
                @media ${media.mediumDevice} {
                  margin-top: 0px;
                  width: 50%;
                }
              }

              & :global(.wrapper__description) {
                margin-bottom: 40px;
              }
            }

            &__completed_badge {
              background-color: var(--action-primary);
              display: flex;
              align-items: center;
              justify-content: space-evenly;
              text-align: left;
              border-radius: 18px;
              padding: 10px;
              max-width: 300px;
            }

            :global(&__completed_icon) {
              margin-left: 20px;

              width: 22px;
              height: 22px;

              :global(svg) {
                width: 100%;
                height: 100%;
              }
            }
          }
        `}
      </style>
    </>
  );
}

Home.propTypes = {
  courseTitle: PropTypes.string.isRequired,
  courseDescription: PropTypes.string.isRequired,
  coursePortada: PropTypes.string.isRequired,
};

export default Home;
