import React from 'react';

import { pxToRem } from 'utils/helpers';
import { media } from 'constants';

function Explanation({ correct, text }) {
  return (
    <>
      <div className="explanation">
        <h3 className="explanation__title">
          {correct ? '¡Respuesta correcta!' : '¡Respuesta incorrecta!'}
        </h3>
        {text && <p className="explanation__text">{text}</p>}
      </div>
      <style jsx>
        {`
          .explanation {
            display: flex;
            flex-direction: column;
            background-color: ${correct
              ? 'var(--green-100)'
              : 'var(--red-100)'};
            color: ${correct ? 'var(--green-200)' : 'var(--red-200)'};
            padding: 15px;
            border-radius: 15px;
            margin-top: 35px;

            @media ${media.mediumDevice} {
              padding: 25px;
            }

            &__title {
              font-size: ${pxToRem(20)};

              @media ${media.mediumDevice} {
                font-size: ${pxToRem(22)};
              }
            }

            &__text {
              font-size: ${pxToRem(18)};

              @media ${media.mediumDevice} {
                font-size: ${pxToRem(20)};
              }
            }
          }
        `}
      </style>
    </>
  );
}

export default Explanation;
