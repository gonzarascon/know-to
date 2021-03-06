import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { media } from 'constants';
import { pxToRem } from 'utils/helpers';

function RadioButton({ value, label, checked, onChange, optionId }) {
  return (
    <>
      <div className="unique-answer__option-container">
        <input
          value={value}
          checked={checked}
          onChange={onChange}
          type="radio"
          className="unique-answer__option-input"
          id={optionId}
        />
        <label className="unique-answer__option-label" htmlFor={optionId}>
          {label}
        </label>
        <span className="unique-answer__option-check" />
      </div>

      <style jsx>
        {`
          .unique-answer__option-container {
            display: block;
            position: relative;
            user-select: none;
            padding: 10px 20px;

            @media (hover: hover) {
              &:hover {
                opacity: 0.75;

                & .unique-answer__option-check {
                  border-width: 5px;
                }
              }
            }
          }

          .unique-answer__option-input {
            position: absolute;
            opacity: 0;

            &:checked ~ .unique-answer__option-check {
              border-width: 5px;
              background-color: var(--white);
            }
          }

          .unique-answer__option-label {
            padding-left: 40px;
            font-size: ${pxToRem(20)};
            cursor: pointer;
            position: relative;
            z-index: 6;
            display: block;
            width: 100%;
          }

          .unique-answer__option-check {
            display: block;
            position: absolute;
            border: 2px solid var(--action-primary);
            border-radius: 100%;
            height: 25px;
            width: 25px;
            top: 12px;
            z-index: 5;
            transition: all 0.2s ease;
          }
        `}
      </style>
    </>
  );
}

RadioButton.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  optionId: PropTypes.string.isRequired,
};

function UniqueAnswer({
  statement,
  questions,
  selectedOption,
  setSelectedOption,
}) {
  return (
    <>
      <section className="unique-answer">
        <form className="unique-answer__form">
          <h3 className="unique-answer__title">{statement.pregunta}</h3>
          {questions.map((question) => (
            <RadioButton
              key={question.id}
              value={question.respuesta}
              label={question.respuesta}
              checked={selectedOption === question.respuesta}
              onChange={(e) => {
                setSelectedOption(e.target.value);
              }}
              optionId={`option${question.id}`}
            />
          ))}
        </form>
      </section>
      <style jsx>
        {`
          .unique-answer {
            padding-top: 35px;

            &::before {
              content: '';
              display: block;
              width: 100%;
              height: 2px;
              background-color: var(--white);
              margin: 0 auto;
              margin-bottom: 20px;

              @media ${media.mediumDevice} {
                width: 80%;
              }
            }

            &__title {
              font-size: ${pxToRem(20)};
              margin-bottom: 20px;
            }
          }
        `}
      </style>
    </>
  );
}

export default UniqueAnswer;
