import React from 'react';
import PropTypes from 'prop-types';

import { pxToRem } from 'utils/helpers';

function Button({ children, ...props }) {
  return (
    <>
      <button {...props} className="button">
        {children}
      </button>
      <style jsx>
        {`
          .button {
            border: 5px solid var(--action-primary);
            background: transparent;
            border-radius: 43px;
            min-width: 250px;
            padding: 10px 20px;
            color: white;
            font-family: var(--f-Rubik);
            font-weight: var(--f-bold);
            font-size: ${pxToRem(25)};
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
