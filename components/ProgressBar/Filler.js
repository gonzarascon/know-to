import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { motion, useAnimation } from 'framer-motion';

function Filler({ percentage }) {
  const controls = useAnimation();
  const [parsedPercentage, setParsedPercentage] = useState('0%');
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

  useEffect(() => {
    setParsedPercentage(`${percentage}%`);
  }, [percentage]);

  useEffect(() => {
    controls.start('full');
  }, [parsedPercentage]);

  return (
    <>
      <motion.div
        className="progress-bar__filler"
        initial="init"
        animate={controls}
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
