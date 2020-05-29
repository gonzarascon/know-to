import React from 'react';
import PropTypes from 'prop-types';

import { media } from 'constants';
import { pxToRem } from 'utils/helpers';

function Button({ children, className, ...props }) {
  return (
    <>
      <button {...props} className={`button ${className}`}>
        {children}
      </button>
      <style jsx>
        {`
          .button {
            display: block;
            border: 5px solid var(--action-primary);
            background: transparent;
            border-radius: 43px;
            min-width: 250px;
            padding: 10px 20px;
            color: white;
            font-family: var(--f-Rubik);
            font-weight: var(--f-bold);
            font-size: ${pxToRem(25)};
            margin: 0 auto;

            @media ${media.mediumDevice} {
              margin: 0;
            }

            &:focus {
              outline: none;
            }

            @media (hover: hover) {
              &:hover {
                background: var(--action-primary);
                cursor: pointer;
                transition: background ease 0.1s;
              }
            }
          }
        `}
      </style>
    </>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Button;
