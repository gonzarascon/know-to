import React from 'react';
import PropTypes from 'prop-types';

import { pxToRem } from 'utils/helpers';

function FormInput({ label, ...props }) {
  return (
    <>
      <div className="form-input">
        <label className="form-input__label">{label}</label>
        <input className="form-input__input" {...props} />
      </div>
      <style jsx>
        {`
          .form-input {
            width: 100%;
            margin-top: 25px;
            &__label {
              font-size: ${pxToRem(25)};
              margin-bottom: 15px;
              display: inline-block;
            }

            &__input {
              background-color: var(--white);
              width: 100%;
              height: 60px;
              border: 0;
              border-radius: 15px;

              padding: 0 25px;

              font-size: ${pxToRem(20)};

              &:focus {
                outline: none;
                box-shadow: 0 0 0px 3px var(--action-primary);
              }

              &::placeholder {
                font-style: var(--f-italic);
              }
            }
          }
        `}
      </style>
    </>
  );
}

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
};

export default FormInput;
