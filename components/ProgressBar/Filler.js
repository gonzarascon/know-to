import React from 'react';
import PropTypes from 'prop-types';

import { motion } from 'framer-motion';

function Filler({ percentage }) {
  const FillerVariants = {
    init: {
      width: '0%',
    },
    full: (i) => ({
      width: i,
      transition: {
        delay: 0.75,
        duration: 0.75,
      },
    }),
  };

  const parsedPercentage = `${percentage}%`;

  return (
    <>
      <motion.div
        className="progress-bar__filler"
        initial="init"
        animate="full"
        custom={parsedPercentage}
        variants={FillerVariants}
      />
      <style jsx>
        {`
          :global(.progress-bar__filler) {
            height: 100%;
            background-image: url('/images/svg/progressbar-fill.svg');
            background-color: var(--action-primary);
            background-repeat: repeat-x;
            background-position: center center;
            border-radius: inherit;
          }
        `}
      </style>
    </>
  );
}

Filler.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default Filler;
