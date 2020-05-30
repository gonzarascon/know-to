import React from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight.js';

import { pxToRem } from 'utils/helpers';

function Code({ value }) {
  return (
    <>
      <Highlight>{value}</Highlight>
      <style jsx>
        {`
          :global(.hljs) {
            font-size: ${pxToRem(16)};
            border-radius: 15px;
            padding: 20px;
          }
        `}
      </style>
    </>
  );
}

Code.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Code;
