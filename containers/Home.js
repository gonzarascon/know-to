import React from 'react';
import PropTypes from 'prop-types';

import { media } from 'constants';
import { Media } from 'utils/mediaRender';

import { AnimatedText, Button } from 'components';

function Home({ courseTitle, courseDescription, coursePortada }) {
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
          }
        `}
      </style>
    </>
  );
}

export default Home;
