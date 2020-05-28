import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import { media } from 'constants';
import { pxToRem } from 'utils/helpers';

function AnimatedText({ children }) {
  const variants = {
    hide: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <motion.p
        className="animated-text"
        variants={variants}
        initial="hide"
        animate="show"
      >
        {children}
      </motion.p>
      <style jsx>
        {`
          :global(.animated-text) {
            font-family: var(--f-OpenSans);
            font-weight: var(--f-light);
            @media ${media.mediumDevice} {
              font-size: ${pxToRem(25)};
            }
          }
        `}
      </style>
    </>
  );
}

AnimatedText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
};

AnimatedText.defaultProps = {
  children: 'Insert your text here',
};

export default AnimatedText;
