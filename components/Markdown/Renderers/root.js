import React from 'react';
import PropTypes from 'prop-types';
import { pxToRem } from 'utils/helpers';

function root({ children }) {
  return (
    <>
      <article className="wrapper__lecture-content"> {children} </article>
      <style jsx>
        {`
          & .wrapper__lecture-content {
            font-size: ${pxToRem(18)};
            margin-top: 20px;
          }
        `}
      </style>
    </>
  );
}

export default root;
