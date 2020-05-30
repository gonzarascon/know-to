import React from 'react';
import PropTypes from 'prop-types';

import { pxToRem } from 'utils/helpers';

function link({ href, children }) {
  return (
    <>
      {' '}
      <a href={href} className="md-link">
        {children}
      </a>{' '}
      <style jsx>
        {`
          .md-link {
            color: var(--action-primary);
            font-weight: var(--f-bold);
            text-decoration: none;
          }
        `}
      </style>{' '}
    </>
  );
}

export default link;
