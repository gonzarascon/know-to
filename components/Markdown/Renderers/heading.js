import React from 'react';
import PropTypes from 'prop-types';

import { pxToRem } from 'utils/helpers';

function RenderHeadingByLevel({ level, className, children }) {
  switch (level) {
    case 1:
      return <h1 className={`${className}-1`}>{children}</h1>;
    case 2:
      return <h2 className={`${className}-2`}>{children}</h2>;
    case 3:
      return <h3 className={`${className}-3`}>{children}</h3>;
    case 4:
      return <h4 className={`${className}-4`}>{children}</h4>;
    case 5:
      return <h5 className={`${className}-5`}>{children}</h5>;
    default:
      return <h6 className={`${className}-6`}>{children}</h6>;
  }
}

function heading({ level, children }) {
  return (
    <>
      <RenderHeadingByLevel className="md-title" level={level}>
        {children[0].props.value}
      </RenderHeadingByLevel>

      <style jsx>
        {`
          :global(.md-title-1) {
            font-size: ${pxToRem(25)};
          }

          :global(.md-title-2) {
            font-size: ${pxToRem(20)};
          }

          :global(.md-title-3) {
            font-size: ${pxToRem(18)};
          }
        `}
      </style>
    </>
  );
}

heading.propTypes = {
  value: PropTypes.string.isRequired,
};

export default heading;
