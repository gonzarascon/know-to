import React from 'react';
import PropTypes from 'prop-types';

import { media } from 'constants';

import { pxToRem } from 'utils/helpers';

import { AnimatedText } from 'components';

function Congratulations({ courseTitle, userPoints }) {
  return (
    <>
      <section className="wrapper wrapper--congrats">
        <div className="wrapper__content">
          <h2 className="wrapper__big-heading">¡Felicidades!</h2>
          <AnimatedText className="wrapper__description">
            Has finalizado el curso <strong>{courseTitle}</strong>
          </AnimatedText>
          <AnimatedText className="wrapper__description">
            Tu calificación final ha sido de{' '}
            <strong>{userPoints} puntos.</strong>
          </AnimatedText>
          <AnimatedText className="wrapper__description">
            Aguarda instrucciones del administrador sobre tus resultados del
            curso.
          </AnimatedText>
          <AnimatedText className="wrapper__description">
            ¡Muchas gracias por participar! <br />
            <sub className="wrapper__aclaration">
              (Puedes cerrar esta pestaña sin problemas)
            </sub>
          </AnimatedText>
        </div>
      </section>
      <style jsx>
        {`
          .wrapper {
            &--congrats {
              display: flex;
              flex-direction: column;
              justify-content: center;

              & .wrapper__big-heading {
                margin-bottom: 25px;
              }

              & .wrapper__content {
                @media ${media.mediumDevice} {
                  width: 50%;
                }
              }

              & :global(.wrapper__description) {
                margin-bottom: 30px;

                &:global(.wrapper__aclaration) {
                  font-size: ${pxToRem(16)};
                  color: var(--gray-100);
                }
              }
            }
          }
        `}
      </style>
    </>
  );
}

export default Congratulations;
