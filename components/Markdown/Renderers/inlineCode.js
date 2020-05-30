import React from 'react';
import PropTypes from 'prop-types';

function inlineCode({ value }) {
  return (
    <>
      <code className="inline-code">{value}</code>
      <style jsx>
        {`
          .inline-code {
            background-color: var(--gray-300);
            color: var(--orange);
            padding: 3px 10px;
            border-radius: 5px;
          }
        `}
      </style>{' '}
    </>
  );
}

inlineCode.propTypes = {
  value: PropTypes.string.isRequired,
};

export default inlineCode;
