import React from 'react';
import PropTypes from 'prop-types';

import * as Icon from '@ant-design/icons';

import { pxToRem } from 'utils/helpers';

function IconButton({ icon, size, ...props }) {
  function renderIcon() {
    const IconToRender = Icon[icon];

    return <IconToRender />;
  }

  return (
    <>
      <button
        {...props}
        className={`icon-button ${props.className}`}
        type="button"
      >
        {renderIcon()}
      </button>
      <style jsx>
        {`
          .icon-button {
            background-color: transparent;
            border: none;
            outline: 0;
            color: white;
            width: ${`${size}px`};
            height: ${`${size}px`};

            border-radius: 100%;

            font-size: ${pxToRem(size / 1.75)};

            display: flex;
            justify-content: center;
            align-items: center;

            @media (hover: hover) {
              &:hover {
                cursor: pointer;
                background-color: var(--action-primary);
              }
            }
          }
        `}
      </style>
    </>
  );
}

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
};

IconButton.defaultProps = {
  size: 40,
};

export default IconButton;
